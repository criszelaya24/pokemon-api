import { Document } from 'mongoose';
import { Model } from 'mongoose';

export interface Pokemon extends Document {
    abilities:                Ability[];
    base_experience:          number;
    forms:                    Localizable[];
    game_indices:             GameIndex[];
    height:                   number;
    held_items:               any[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_types:               any[];
    species:                  Localizable;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
}

export interface Ability {
    ability:   Localizable;
    is_hidden: boolean;
    slot:      number;
}

export interface Localizable {
    name: string;
    url:  string;
}

export interface GameIndex {
    game_index: number;
    version:    Localizable;
}

export interface Move {
    move:                  Localizable;
    version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at:  number;
    move_learn_method: Localizable;
    version_group:     Localizable;
}

export interface Versions {
    'generation-i':    Generation;
    'generation-ii':   Generation;
    'generation-iii':  Generation;
    'generation-iv':   Generation;
    'generation-v':    Generation;
    'generation-vi':   { [key: string]: { [key:string]: string } };
    'generation-vii':  Generation;
    'generation-viii': Generation;
}

export interface Sprites {
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    other?:             Other;
    versions?:          Versions;
    animated?:          Sprites;
}

export interface Generation {
    [key:string]: GenerationAttributes;
}

export interface GenerationAttributes {
    [key:string]:      string;
}

export interface Other {
    [key:string]: { [key:string]: string };
}

export interface Stat {
    base_stat: number;
    effort:    number;
    stat:      Localizable;
}

export interface Type {
    slot: number;
    type: Localizable;
}

export interface PokemonStaticModel extends Model<Pokemon> {
    findByType(type:string): Pokemon;
}
