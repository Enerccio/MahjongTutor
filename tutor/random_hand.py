import pprint
import random

from mahjong.hand_calculating.hand import HandCalculator
from mahjong.hand_calculating.hand_config import HandConfig, OptionalRules
from mahjong.meld import Meld
from mahjong.tile import TilesConverter
from mahjong.constants import EAST, WEST, NORTH, SOUTH, FIVE_RED_MAN, FIVE_RED_PIN, FIVE_RED_SOU

_rnd = random.Random()
calculator = HandCalculator()

def publicapi(fnc):
    return fnc


# noinspection PyAttributeOutsideInit,PyShadowingNames,PyShadowingBuiltins
class Hand(object):
    @staticmethod
    def generate_tiles(red=False):
        tiles = []
        for type in ("man", "pin", "sou"):
            for i in range(4):
                for n in "123456789":
                    tiles.append((0, type, n, False))

            if red:
                tiles.remove((0, type, "5", False))
                tiles.append((0, type, "5", True))
            tiles.append((2, "dragon", "haku", None))
            tiles.append((2, "dragon", "hatsu", None))
            tiles.append((2, "dragon", "chun", None))
            tiles.append((1, "wind", "east", None))
            tiles.append((1, "wind", "north", None))
            tiles.append((1, "wind", "south", None))
            tiles.append((1, "wind", "west", None))
        return tiles

    @staticmethod
    def convert_hand(hand):
        manzi = ""
        pinzi = ""
        souzi = ""
        honors = ""

        reds = []
        for (rank, type, value, is_red) in sorted(hand):
            if type == "man":
                if is_red:
                    reds.append(FIVE_RED_MAN)
                else:
                    manzi += value
            if type == "pin":
                if is_red:
                    reds.append(FIVE_RED_PIN)
                else:
                    pinzi += value
            if type == "sou":
                if is_red:
                    reds.append(FIVE_RED_SOU)
                else:
                    souzi += value
            if type == "dragon":
                if value == "haku":
                    honors += "5"
                if value == "hatsu":
                    honors += "6"
                if value == "chun":
                    honors += "7"
            if type == "wind":
                if value == "east":
                    honors += "1"
                if value == "south":
                    honors += "2"
                if value == "west":
                    honors += "3"
                if value == "north":
                    honors += "4"

        return TilesConverter.string_to_136_array(man=manzi, sou=souzi, pin=pinzi, honors=honors, has_aka_dora=True) + reds

    @staticmethod
    def convert_hand_print(hand):
        h = ""

        for (rank, type, value, is_red) in sorted(hand):
            if type == "man":
                h += "M" + value + ("R " if is_red else " ")
            if type == "pin":
                h += "P" + value + ("R " if is_red else " ")
            if type == "sou":
                h += "S" + value + ("R " if is_red else " ")
            if type == "dragon":
                if value == "Haku ":
                    h += "Haku "
                if value == "Hatsu ":
                    h += "Hatsu "
                if value == "Chun ":
                    h += "Chun "
            if type == "wind":
                if value == "east":
                    h += "Ton "
                if value == "south":
                    h += "Nan "
                if value == "west":
                    h += "Sha "
                if value == "north":
                    h += "Pei "

        return h

    @staticmethod
    def generate_chi(source_tiles):
        while True:
            group, type, value, is_red = _rnd.choice(source_tiles)
            if group == 0:
                if value == '1':
                    select_tiles = ['1', '2', '3']
                elif value == '9':
                    select_tiles = ['7', '8', '9']
                else:
                    select_tiles = [str(int(value)-1), value, str(int(value)+1)]
                has_all_tiles = True
                copy = [] + source_tiles
                tiles_in_chii = []
                for t in select_tiles:
                    searched = Hand._find_with_dora((group, type, t), copy)
                    if searched is None:
                        has_all_tiles = False
                        break
                    copy.remove(searched)
                    tiles_in_chii.append(searched)
                if has_all_tiles:
                    return tiles_in_chii

    @staticmethod
    def generate_pon(source_tiles, length=3):
        while True:
            group, type, value, is_red = _rnd.choice(source_tiles)
            select_tiles = [value for x in range(length)]
            has_all_tiles = True
            copy = [] + source_tiles
            tiles_in_meld = []
            for t in select_tiles:
                searched = Hand._find_with_dora((group, type, t), copy)
                if searched is None:
                    has_all_tiles = False
                    break
                copy.remove(searched)
                tiles_in_meld.append(searched)
            if has_all_tiles:
                return tiles_in_meld

    @staticmethod
    def generate_pair(source_tiles):
        while True:
            group, type, value, is_red = _rnd.choice(source_tiles)
            select_tiles = [value, value]
            has_all_tiles = True
            copy = [] + source_tiles
            tiles_in_pair = []

            for t in select_tiles:
                searched = Hand._find_with_dora((group, type, t), copy)
                if searched is None:
                    has_all_tiles = False
                    break
                copy.remove(searched)
                tiles_in_pair.append(searched)

            if has_all_tiles:
                return tiles_in_pair

    @staticmethod
    def _find_with_dora(tile, copy):
        for (rank, type, value, is_red) in copy:
            if tile == (rank, type, value):
                return rank, type, value, is_red
        return None

    def __init__(self):
        self.hand = []
        self.melds = []
        self.pure_hand = []

    def generate(self, cfg):
        self.all_tiles = sorted(Hand.generate_tiles(cfg.has_red))
        _rnd.shuffle(self.all_tiles)

        while True:
            self.hand = []
            self.pure_hand = []
            self.melds = []
            self.kan_count = 0
            self.round_wind = _rnd.choice([(1, "wind", "east"), (1, "wind", "north"), (1, "wind", "south"), (1, "wind", "west")])
            self.player_wind = _rnd.choice([(1, "wind", "east"), (1, "wind", "north"), (1, "wind", "south"), (1, "wind", "west")])

            # add specifiers
            source_tiles = self.all_tiles + []

            melds = []
            can_riichi = True
            for _ in range(4):
                open = False
                if _rnd.random() < cfg.chi_chance:
                    # generate chi
                    meld = self.generate_chi(source_tiles)
                    if _rnd.random() < cfg.chi_open_chance:
                        open = True
                        can_riichi = False
                        melds.append(Meld(meld_type=Meld.CHI, opened=True, tiles=Hand.convert_hand(meld)))
                        self.melds.append((sorted(meld), True))
                else:
                    if _rnd.random() < cfg.pon_chance:
                        meld = self.generate_pon(source_tiles)
                        if _rnd.random() < cfg.pon_open_chance:
                            open = True
                            can_riichi = False
                            melds.append(Meld(meld_type=Meld.PON, opened=True, tiles=Hand.convert_hand(meld)))
                            self.melds.append((sorted(meld), True))
                    else:
                        # kan
                        meld = self.generate_pon(source_tiles, 4)
                        opened = _rnd.random() < cfg.kan_open_chance
                        open = True
                        can_riichi = False if opened else can_riichi
                        melds.append(Meld(meld_type=Meld.KAN, opened=opened, tiles=Hand.convert_hand(meld)))
                        self.melds.append((sorted(meld), opened))
                        self.kan_count += 1
                for tile in meld:
                    self.hand.append(tile)
                    if not open:
                        self.pure_hand.append(tile)
                    source_tiles.remove(tile)

            pair = self.generate_pair(source_tiles)
            for tile in pair:
                self.hand.append(tile)
                self.pure_hand.append(tile)
                source_tiles.remove(tile)

            self.hand = sorted(self.hand)
            self.pure_hand = sorted(self.pure_hand)

            self.win_tile = _rnd.choice(self.hand)
            if self.win_tile in self.pure_hand:
                self.pure_hand.remove(self.win_tile)

            if self.finish_hand(can_riichi, melds, cfg, source_tiles):
                break

    def finish_hand(self, can_riichi, melds, cfg, source_tiles):
        self.is_tsumo = _rnd.random() < 0.5
        self.is_riichi = can_riichi and _rnd.random() < 0.5

        if self.round_wind[2] == "east":
            round_wind = EAST
        elif self.round_wind[2] == "north":
            round_wind = NORTH
        elif self.round_wind[2] == "south":
            round_wind = SOUTH
        else:
            round_wind = WEST

        if self.player_wind[2] == "east":
            player_wind = EAST
        elif self.player_wind[2] == "north":
            player_wind = NORTH
        elif self.player_wind[2] == "south":
            player_wind = SOUTH
        else:
            player_wind = WEST

        for i in range(3):
            if _rnd.random() < cfg.other_player_kan_chance[i]:
                self.kan_count += 1

        self.dora_indicators = []
        self.uradora_indicators = []
        for i in range(self.kan_count + 1):
            tile = _rnd.choice(source_tiles)
            source_tiles.remove(tile)

            self.dora_indicators.append(tile)
            if self.is_riichi:
                tile = _rnd.choice(source_tiles)
                source_tiles.remove(tile)

                self.uradora_indicators.append(tile)

        doras = Hand.convert_hand(self.dora_indicators + self.uradora_indicators)

        result = calculator.estimate_hand_value(Hand.convert_hand(self.hand),
                                                Hand.convert_hand([self.win_tile])[0], melds=melds,
                                                dora_indicators=doras,
                                                config=HandConfig(is_riichi=self.is_riichi, is_tsumo=self.is_tsumo, player_wind=player_wind,
                                                                  round_wind=round_wind,
                                                                  options=OptionalRules(has_aka_dora=cfg.has_red)))

        if result.error is None:
            self.han = result.han
            self.fu = result.fu
            self.yaku = result.yaku
            self.cost = result.cost['main']
            self.fu_details = result.fu_details
            return True
        return False

    def print(self):
        print("Hand: " + self.convert_hand_print(self.hand))
        print("Win tile: " + self.convert_hand_print([self.win_tile]))
        for meld, opened in self.melds:
            print("Meld " + self.convert_hand_print(meld) + " opened: " + str(opened))
        print("Dora: " + self.convert_hand_print(self.dora_indicators))
        print("Uradora: " + self.convert_hand_print(self.uradora_indicators))
        print("Han: %s, Fu: %s, Score: %s " % (str(self.han), str(self.fu), str(self.cost)))
        print(self.yaku)
        print(self.fu_details)

    @publicapi
    def get_hand_tiles(self):
        return self.pure_hand

    @publicapi
    def get_win_tile(self):
        return self.win_tile

    @publicapi
    def get_melds(self):
        return self.melds

    def get_winds(self):
        return [self.round_wind, self.player_wind]
