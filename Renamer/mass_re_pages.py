from res import *

TAG = {
    1: 2,
    2: 1,
    3: 10,
    4: 5
}

keys = []

values = []

dynamic_tag = dict(zip(keys, values))

TAG = TAG if not RES.DYNAMIC else dynamic_tag

def start():

    validate1 = not RES.DYNAMIC and len(TAG.values()) == len(set(TAG.values()))
    validate2 = RES.DYNAMIC and len(keys) == len(values) and len(values) == len(set(values))

    if not validate1 and not validate2:
        ic('error')
        return ic(validate1, validate2)

    keys, values = list(TAG.keys()), list(TAG.values())
    re_pages(from_pages=keys, to_pages=values)


start()