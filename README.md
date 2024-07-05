# The Purpose of this application is for Sigma Phi Delta brothers to be able to easily record their own attendance ahead of required chapter events.
These events can range from chapters, town halls, rush/new member events, etc.

## How the application works
For the actual form that brothers will use to sign in, they will simply enter their
first & last names, whether they will be attending the event or not, and their VALID
excuse if they cannot make it. Once they fill these parts, they can press submit
and have their attendance recorded to the MongoDB database that the app is connected to.

Additionally, brothers may click the link beneath the form to view the attendance records
and see how many they have/haven't attended. Be sure to update the link of the attendance
form as necessary for each new semester.

<strong>DO NOT</strong> change the general access option to "anyone with the link."
Keep it on restricted so that only those who can access the drive can see it.
If brothers cannot access this sheet, add them to the drive as you see fit.

## How the attendance recording works
Within the python_scripts folder, there are 3 items of interest.
<ol>
    <li>The "Attendance_Sheets" folder that houses excel files of recorded events.<br/>This is where excel files go when the script is run.</li>
    <li>"attendance.py" is the actual script that connects to the MongoDB database and creates a new excel file for the current date's event.<br/>This files describes how attendance is recorded and derives statistics for a particular event.</li>
    <li>"brother_name_set.py" houses all the names of active brothers - needs to be updated semesterly.</li>
</ol>

## When the event /sign in period ends
When this point in time is reached (determined by you), go into "Form.jsx" and disable
the form by setting the "disabled" variable to true. 

After this, you can run the "attendance.py" script to create the excel sheet recording
the event's attendance. Open the excel sheet and copy & paste the second column into 
the cumulative Google Sheet in the Sig Phi drive.

<strong>IMPORTANT</strong>
Sometimes brothers are lazy and do not want to input their names correctly. You must
ensure everything in the cumulative Google Sheet is lined up correctly.