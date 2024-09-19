from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime

import openpyxl
import os

"""
    If a brother was present, they get a 1.
    If they are with a valid excuse, they get a 0.
    If they are totally missing (not in brother names set), they get a -1.
"""

from brother_name_set import brothers_set


# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))


# Construct the path to the .env file
env_path = os.path.join(script_dir, "..", ".env")


# Load environment variables from .env and new excel file.
load_dotenv(dotenv_path=env_path)
uri = os.getenv("MONGO_CONNECTION_STRING")


# Function to connect to the MongoDB database
def get_db():
    client = MongoClient(uri)
    return client["SPD_Attendence"]


# Function to calculate relevant statistics for this required event.
# lst: A list containing 0, 1, -1.
def calculate_percentages(lst):
    total = len(lst)
    if total == 0:
        return {"Missed": 0, "Attended": 0, "Excused": 0}

    count_0 = lst.count(0)
    count_1 = lst.count(1)
    count_minus_1 = lst.count(-1)

    percentage_0 = (count_0 / total) * 100
    percentage_1 = (count_1 / total) * 100
    percentage_minus_1 = (count_minus_1 / total) * 100

    return {
        "Missed": round(percentage_0, 2),
        "Attended": round(percentage_1, 2),
        "Excused": round(percentage_minus_1, 2),
    }


if __name__ == "__main__":
    try:
        event_type = "Chapter"  # Event type
        date = datetime.now().strftime("%m_%d_%Y")  # Get current date.
        title = f"{event_type}_Attendance_{date}"  # Sheet title
        db = get_db()  # Connect to DB.
        xl = openpyxl.Workbook()  # Create a new excel file & label it.
        sheet = xl.active
        sheet.title = title

        # Get the attended/missed collections.
        attending = db["attended"]
        attendees = attending.find()

        missed = db["missed"]
        missees = missed.find()

        # Keys are brother name, values or -1, 0, or 1 depending on attendance.
        brothers = {}

        # Assuming 'attendees' and 'missees' are dictionaries
        for a in attendees:
            brothers[a["name"]] = 1

        for m in missees:
            brothers[m["name"]] = 0

        for brother in brothers_set:
            if brother not in brothers.keys():
                brothers[brother] = -1

        # Sort brother based on name (alphabetical order)
        brothers = dict(sorted(brothers.items()))
        statuses = list(brothers.values())
        event_statistics = calculate_percentages(statuses)

        # Enter the event's title on the first row.
        sheet.append(["", title])

        # Record their attendance in rows.
        for brother_name, attend_value in brothers.items():
            sheet.append([brother_name, attend_value])

        # Insert event statistics into the sheet
        for status, statistic in event_statistics.items():
            sheet.append([status, statistic])

        # Saving to Attendance Sheet directory
        directory = f"{script_dir}/Attendance_Sheets"
        file_path = os.path.join(directory, f"{title}.xlsx")
        xl.save(file_path)

        # Clearing the collections
        db["attended"].delete_many({})
        db["missed"].delete_many({})

    except Exception as e:
        print(f"An error occurred: {e}")
