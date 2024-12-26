from datetime import date, datetime
import random
from dateutil.relativedelta import relativedelta

exercise_id = 5
workouts = open('instance/workouts.csv', 'w')
entries = open('instance/entries.csv', 'w')
sets = open('instance/sets.csv', 'w')

# headers
workouts.write("id,date,completed,start_time,end_time,duration,notes\n")
entries.write("id,date,exercise_id,workout_id,notes\n")
sets.write("id,entry_id,reps,weight,units,notes\n")

offset = 90
workout_id = 1
weights = [85]
while offset >= 0:
    d = date.today() + relativedelta(days=-offset)
    start = datetime.today() + relativedelta(days=-offset)
    r = random.randint(5000, 10000)
    end = start + relativedelta(seconds=r)
    workouts.write(f"{workout_id},{d},1,{start},{end},{r},\n")
    entries.write(f"{workout_id},{d},{exercise_id},{workout_id},\n")

    for i in range(3):
        id = workout_id * 3 - 2
        r = random.random()
        if r < 0.20:
            weights.append(weights[-1] + 5)
        elif r < 0.30 and len(weights) > 1:
            weights.pop(0)
        sets.write(f"{id+i},{workout_id},10,{random.choice(weights)},lbs,\n")


    workout_id += 1
    offset -= random.randint(2, 4)


workouts.close()
entries.close()
sets.close()
