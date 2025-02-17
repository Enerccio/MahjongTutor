import traceback

try:
    from tutor.random_hand import Hand
except ImportError:
    from random_hand import Hand

class Tutor(object):
    def __init__(self):
        self.hand = None
        self.has_red = True
        self.chi_chance = 0.75
        self.chi_open_chance = 0.5
        self.pon_chance = 0.75
        self.pon_open_chance = 0.65
        self.kan_open_chance = 0.75
        self.kan_closed_declare_chance = 0.5
        self.other_player_kan_chance = [0.3, 0.2, 0]
        self.chiitoitsu_chance = 0.15
        self.tsumo_chance = 0.5
        self.riichi_chance = 0.5

        # debug

        # self.chi_chance = 0
        # self.chi_open_chance = 0
        # self.pon_chance = 0
        # self.pon_open_chance = 0
        # self.kan_open_chance = 0
        # self.kan_closed_declare_chance = 0.5
        # self.chiitoitsu_chance = 1

    def generate(self):
        self.hand = Hand()

        cnt = 0
        while True:
            # noinspection PyBroadException
            try:
                self.hand.generate(self)
                break
            except:
                traceback.print_exc()
                cnt += 1
                if cnt > 10:
                    break

    def get_hand(self):
        return self.hand


if __name__ == "__main__":
    tutor = Tutor()
    tutor.generate()
    tutor.get_hand().print()
