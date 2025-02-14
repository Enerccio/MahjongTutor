
import os

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