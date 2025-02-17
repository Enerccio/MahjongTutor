
import os

from mahjong.hand_calculating.yaku_list import *
from mahjong.hand_calculating.yaku_list.yakuman import *
from mahjong.hand_calculating.yaku import Yaku

lib = []

def scan(folder, base):
    global lib

    for root, dirs, files in os.walk(folder):
        for name in files:
            if name.endswith(".py"):
                lib.append((folder + "/" + name, base + "/" + name))
        for dir in dirs:
            if dir == "tests":
                continue
            scan(folder + "/" + dir, base + "/" + dir)
        break


if __name__ == "__main__":
    scan("tutor", "./tutor")
    scan("mahjong/mahjong", "./mahjong")

    print("[files]")
    for (srcpath, dstpath) in lib:
        print('"' + srcpath + '" = "' + dstpath + '"')

    print()
    print("const __staticImageCacheLoader = [")
    for root, dirs, files in os.walk("riichi-mahjong-tiles/Regular"):
        for name in files:
            print("\"" + name + "\", ")
    print("]\n")


    for key in dict(globals()):
        e = globals()[key]
        if isinstance(e, type) and issubclass(e, Yaku) and e != Yaku:
            obj = e()
            name = obj.name
            print("this.yaku[\"%s\"] = \"\";" % name)
