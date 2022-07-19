Change Request
==============

------

# TASK-001 As user, I want to set due dates for my tasks
Story point estimation: 5

## What is/are needed to change: 
Need to add a due dates for user task. 

1. add one datepicker input when adding / creating a task
2. show a `Due date: ` label or chip on added tasks
3. make the `Due date: ` label or chip on point 2 to be editable on clicked
4. make the `Due date: ` label or chip to have orange background when the due date is less than today
5. (API) change the api to support due date field

## Notes / remarks:

1. all due dates are to be stored without time information (assuming 00:00 in local time)
2. due dates can be set with value less than today, for backdate input
3. due dates can be null

# TASK-002 As user, I to only see 20 tasks at first to prevent my browser slowed down
Story point estimation: 8

## What is/are needed to change: 
Need to add pagination for user tasks with infinite scrolling.

1. (API) modify the list api so now it accept offset and limit
2. modify the browser's fetcher so it send offset and limit parameter to the api
3. modify the task list to support infinite scrolling, which will fetch another tasks with bigger pagination.
4. when no more tasks are there to be displayed / fetched, show "You've already reached the end of the task list" message

## Notes / remarks:

1. communicate with TASK-003 handler to implement pagination ordered by prioritization

# TASK-003 As user, I want to reorder my tasks so I can re-prioritize it
Story point estimation: 5

## What is/are needed to change: 
Need to enable user to drag and drop tasks to reorder it.

1. (API) add a new `task_order` collection, with id = task id & order = numeric value starting from 1
2. (API) populate `task_order` collection with task id and numeric order
3. (API) add a "reorder" endpoint that will truncate the `task_order` collection and insert based on input
4. (API) modify the create endpoints to also insert a `task_order` record with order = highest order + 1
5. make the task to be drag-dropable to enable sorting

## Notes / remarks:

1. the higher order value, the upper / top the task position is
2. communicate with TASK-002 handler to implement pagination ordered by prioritization 
