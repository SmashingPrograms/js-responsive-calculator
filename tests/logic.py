calc_display = 0

operators = [
  '+',
  '-',
  '*',
  '/',
]

def check_for_basic_errors(x):
  if len(x) > 1:
    print("Don't type multiple letters. You're missing the point of this damn test!")
    return False
  elif len(x) == 0:
    print("Don't type nothing, na!")
    return False
  return True


while 1:
  x = input("> ")
  if check_for_basic_errors(x) == False:
    continue
  try: # if what is typed is an integer, i.e. DIGITS MODE!!!!!!
    x = int(x)
  except ValueError: # OPERATORS MODE!!!!!!
    print("Okay, NOW it's a ")