from datetime import date, datetime
import random
from dateutil.relativedelta import relativedelta


def build_data(exercises):
    global workouts, entries, sets, offset
    workout_id = 1
    set_id = 1
    entry_id = 1
    weight_list = [[x[1]] for x in exercises]
    while offset >= 0:
        d = date.today() + relativedelta(days=-offset)
        start = datetime.today() + relativedelta(days=-offset)
        r = random.randint(5000, 10000)
        end = start + relativedelta(seconds=r)
        workouts.write(f"{workout_id},{d},1,{start},{end},{r},\n")

        for (exercise_id, tmp, p1, p2, inc), weights in zip(exercises, weight_list):
            entries.write(f"{entry_id},{d},{exercise_id},{workout_id},\n")

            for _ in range(3):
                r = random.random()
                if r < p1:
                    weights.append(weights[-1] + inc)
                elif r < p1 + p2 and len(weights) > 1:
                    weights.pop(0)
                sets.write(f"{set_id},{entry_id},10,{random.choice(weights)},lbs,\n")
                set_id += 1
            
            entry_id += 1


        workout_id += 1
        offset -= random.randint(2, 4)


offset = 60
workouts = open('instance/workouts.csv', 'w')
entries = open('instance/entries.csv', 'w')
sets = open('instance/sets.csv', 'w')

# headers
workouts.write("id,date,completed,start_time,end_time,duration,notes\n")
entries.write("id,date,exercise_id,workout_id,notes\n")
sets.write("id,entry_id,reps,weight,units,notes\n")

exercises = [
    [1, 50, 0.05, 0.2, 5],
    [2, 95, 0.1, 0.10, 5],
    [3, 25, 0.05, 0.1, 5],
    [4, 25, 0.03, 0.1, 2.5],
    [5, 75, 0.1, 0.1, 5],
    [6, 45, 0.08, 0.1, 5],
]

build_data(exercises)

workouts.close()
entries.close()
sets.close()
