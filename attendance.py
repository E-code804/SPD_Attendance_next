from dotenv import load_dotenv
from pymongo import MongoClient
import openpyxl
import os

"""
    If a brother was present, they get a 1.
    If they are with a valid excuse, they get a 0.
    If they are totally missing (not in brother names set), they get a -1.
"""

from brother_name_set import brothers_set

# Load environment variables from .env and new excel file.
load_dotenv()
uri = os.getenv("MONGO_CONNECTION_STRING")


def get_db():
    client = MongoClient(uri)
    return client["SPD_Attendence"]


if __name__ == "__main__":
    try:
        db = get_db()
        xl = openpyxl.Workbook()
        sheet = xl.active
        sheet.title = "Attendance_01_26_24"

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

        # Sort brother based on name
        brothers = dict(sorted(brothers.items()))

        for brother_name, attend_value in brothers.items():
            sheet.append([brother_name, attend_value])

        xl.save("ex.xlsx")

    except Exception as e:
        print(f"An error occurred: {e}")
