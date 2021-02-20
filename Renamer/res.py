import os
from sys import stdout
from time import sleep
from icecream import ic

DIR = os.path.dirname(os.path.realpath(__file__)) + '\\WorkSpace\\'

class RES_CLASS():
    def __init__(self):
        pass
RES = RES_CLASS()

with open('res.txt', 'r') as f:
    while True:
        rl = f.readline()
        if(rl == ""):
            break
        rl = rl[:-1] if rl[-1] == "\n" else rl

        key, val = rl.split('=')
        f_val = int(val) if val.isnumeric() else f"'{val}'"
        ic(key, f_val)
        exec(f"RES.{key}={f_val}")

def in_print(content):
    stdout.write("\r" + " " * 50) 
    stdout.write(f"\r{content}")

def renames(base = "download", target = None):
    target = eval(f"f'{RES.FORMAT}'") if target is None else target

    try:
        os.rename(DIR + f'{base}.jpg', DIR + f'{target}.jpg')
        RES.PAGE += 1
    except: 
        pass
        # ic(base, target, RES.PAGE, eval(f"f'{RES.FORMAT}'"))

    try:
        os.rename(DIR + f'{base}.png', DIR + f'{target}.png')
        RES.PAGE += 1
    except: pass

def re_pages(from_pages, to_pages):
    hist = []
    for f_page, t_page in zip(from_pages, to_pages):
        RES.PAGE = f_page
        b_formated = eval(f"f'{RES.FORMAT}'")
        RES.PAGE = t_page
        t_formated = eval(f"f'{RES.FORMAT}'") + '-temp'
        renames(base=b_formated, target=t_formated)
        hist += [t_formated]

    for his in hist:
        renames(his, his[:-len('-temp')])

def re_title():
    ORIG_NAME = RES.NAME
    for page in range(1, 99):
        RES.PAGE = page
        RES.NAME = ORIG_NAME
        b_formated = eval(f"f'{RES.FORMAT}'")
        RES.NAME = RES.NEWNAME
        t_formated = eval(f"f'{RES.FORMAT}'")
        renames(base=b_formated, target=t_formated)
        ic(b_formated, t_formated)
        print(f're_title page:{page} finished')
    

