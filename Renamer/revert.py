import os
import sys


def getId(filename):
    return int(filename[0:5])


def revert(b_dir='WorkSpace'):
    DIR = os.path.dirname(os.path.realpath(__file__)) + '\\WorkSpace\\'

    filenames = [fn for fn in os.listdir(b_dir) if fn != '.gitkeep']

    filenames.sort(key=lambda fn: getId(fn))

    UID = 999

    for fn in filenames:
        try:
            os.rename(f'{DIR}{fn}', f'{DIR}{UID}-{fn}')
            UID -= 1
        except:
            pass


if __name__ == '__main__':
    revert()
