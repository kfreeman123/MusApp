enum pitchValueSharp {AN1, AS1, BN1, CN1, CS1, DN1, DS1, EN1, FN1, FS1, GN1, GS1, AN2, AS2, BN2, CN2, CS2, DN2, DS2, EN2, FN2, FS2, GN2, GS2, AN3, AS3, BN3, CN3, CS3, DN3, DS3, EN3, FN3, FS3, GN3, GS3, AN4, AS4, BN4, CN4, CS4, DN4, DS4, EN4, FN4, FS4, GN4, GS4, AN5, AS5, BN5, CN5, CS5, DN5, DS5, EN5, FN5, FS5, GN5, GS5, AN6, AS6, BN6, CN6, CS6, DN6, DS6, EN6, FN6, FS6, GN6, GS6, AN7, AS7, BN7, CN7, CS7, DN7, DS7, EN7, FN7, FS7, GN7, GS7, AN8, AS8, BN8, CN8};
enum pitchValueFlat  {AN1, BF1, BN1, CN1, DF1, DN1, EF1, EN1, FN1, GF1, GN1, AF1, AN2, BF2, BN2, CN2, DF2, DN2, EF2, EN2, FN2, GF2, GN2, AF2, AN3, BF3, BN3, CN3, DF3, DN3, EF3, EN3, FN3, GF3, GN3, AF3, AN4, BF4, BN4, CN4, DF4, DN4, EF4, EN4, FN4, GF4, GN4, AF4, AN5, BF5, BN5, CN5, DF5, DN5, EF5, EN5, FN5, GF5, GN5, AF5, AN6, BF6, BN6, CN6, DF6, DN6, EF6, EN6, FN6, GF6, GN6, AF6, AN7, BF7, BN7, CN7, DF7, DN7, EF7, EN7, FN7, GF7, GN7, AF7, AN8, BF8, BN8, CN8};
enum keyValue {AN, AS, BF, BN, CN, CS, DF, DN, DS, EF, EN, FN, FS, GF, GN, GS, AF};
enum durationValue {Whole, DottedHalf, Half, DottedQuarter, Quarter, DottedEighth, Eighth, DottedSixteenth, Sixteenth, ThirtySecond};

class Bank {
    val = [];

    add (track: Track) {
        this.val.push(track);
    }

    print () {
        console.log("Bank");
        this.val.forEach(track => {
            track.print();
        });
    }
}

class Track {
    val = [];

    add (sequence: Sequence) {
        this.val.push(sequence);
    }

    print () {
        console.log("Track");
        this.val.forEach(sequence => {
            sequence.print();
        });
    }
}

class Sequence {
    val = [];
    name: string;
    key: keyValue;

    constructor(name: string, key: keyValue) {
        this.name = name;
        this.key = key;
    }

    transpose (offset) {
        this.val.forEach(note => {
            note.transpose(offset);
        });
    }

    invert () {
        this.val[0].transpose(12);
        this.val.sort(function(a,b){return a.pitch - b.pitch});
    }

    add (pitch: number, durationVal: durationValue) {             // Add a single note
        this.val.push(new Note(this, pitch, durationVal));
    }

    keyDisplay() {
        switch (this.key) {
            case keyValue.AN:
                return "A";
                break;
            case keyValue.AS:
                return "A#";
                break;
            case keyValue.BF:
                return "Bb";
                break;
            case keyValue.BN:
                return "B";
                break;
            case keyValue.CN:
                return "C";
                break;
            case keyValue.CS:
                return "C#";
                break;
            case keyValue.DF:
                return "Db";
                break;
            case keyValue.DN:
                return "D";
                break;
            case keyValue.DS:
                return "D#";
                break;
            case keyValue.EF:
                return "Eb";
                break;
            case keyValue.EN:
                return "E";
                break;
            case keyValue.FN:
                return "F";
                break;
            case keyValue.FS:
                return "F#";
                break;
            case keyValue.GF:
                return "Gb";
                break;
            case keyValue.GN:
                return "G";
                break;
            case keyValue.GS:
                return "G#";
                break;
            case keyValue.AF:            
                return "Ab";
                break;
            default:
                return "unknown";
                break;
        }
    }

    add_int_M3 (pitch: number, durationVal: durationValue) {      // Add a major 3rd interval
        this.add(pitch, durationVal);
        this.add(pitch + 4, durationVal);
    }

    add_int_m3 (pitch: number, durationVal: durationValue) {      // Add a minor 3rd interval
        this.add(pitch, durationVal);
        this.add(pitch + 3, durationVal);
    }

    add_triad_M3 (pitch: number, durationVal: durationValue) {    // Add a major 3rd triad
        this.add(pitch, durationVal);
        this.add(pitch + 4, durationVal);
        this.add(pitch + 7, durationVal);
    }

    add_triad_m3 (pitch: number, durationVal: durationValue) {    // Add a minor 3rd triad
        this.add(pitch, durationVal);
        this.add(pitch + 3, durationVal);
        this.add(pitch + 7, durationVal);
    }

    add_scale_M (pitch: number, durationVal: durationValue) {     // Add a major scale
        this.add(pitch, durationVal);
        this.add(pitch + 2, durationVal);
        this.add(pitch + 4, durationVal);
        this.add(pitch + 5, durationVal);
        this.add(pitch + 7, durationVal);
        this.add(pitch + 9, durationVal);
        this.add(pitch + 11, durationVal);
        this.add(pitch + 12, durationVal);
    }

    print () {
        console.log("Sequence '" + this.name + "' (Key of " + this.keyDisplay() + ")");
        this.val.forEach(note => {
            note.print();
        });
    }

    display () {
        var disp = "";
        this.val.forEach(note => {
            disp = disp + note.display();
        });
        return disp;
    }

    reset() {
        this.val = [];
    }

}

class Note {

    pitch: number;
    duration: number;
    sequence: Sequence;
    
    constructor (sequence: Sequence, pitch: number, durationVal: durationValue) {
        this.sequence = sequence;
        this.pitch = pitch;
        switch (durationVal) {
            case durationValue.Whole: 
                this.duration = 1;
                break;       
            case durationValue.DottedHalf: 
                this.duration = 0.75;
                break;       
            case durationValue.Half: 
                this.duration = 0.5;
                break;       
            case durationValue.DottedQuarter: 
                this.duration = 0.375;
                break;    
            case durationValue.Quarter: 
                this.duration = 0.25;
                break;       
            case durationValue.DottedEighth: 
                this.duration = 0.1875;
                break;       
            case durationValue.Eighth: 
                this.duration = 0.125;
                break;       
            case durationValue.DottedSixteenth: 
                this.duration = 0.09375;
                break; 
            case durationValue.Sixteenth: 
                this.duration = 0.0625;
                break;       
            case durationValue.ThirtySecond: 
                this.duration = 0.03125;
                break;
            default:
                this.duration = 1;
        }
    }

    s() {
        return pitchValueSharp[this.pitch];
    }

    f() {
        return pitchValueFlat[this.pitch];
    }

    val () {
        return "(" + this.pitch + ")(" + this.duration + ")";
    }

    pitchDisplay () {
        switch (this.sequence.key) {
            case keyValue.AN:
            case keyValue.AS:
            case keyValue.CS:
            case keyValue.BN:
            case keyValue.CN:
            case keyValue.DN:
            case keyValue.DS:
            case keyValue.EN:
            case keyValue.FS:
            case keyValue.GN:
            case keyValue.GS:
                return this.s();
                break;
            case keyValue.BF:
            case keyValue.DF:
            case keyValue.EF:
            case keyValue.FN:
            case keyValue.GF:
            case keyValue.AF:            
                return this.f();
                break;
            default:
                return this.s();
                break;
        }
        return "not available";
    }

    durationDisplay () {
        switch (this.duration) {
            case 1:
                return "whole";
                break;
            case 0.75:
                return "dotted half";
                break;
            case 0.5:
                return "half";
                break;
            case 0.375:
                return "dotted quarter";
                break;
            case 0.25:
                return "quarter";
                break;
            case 0.1875:
                return "dotted eighth"
                break;
            case 0.125:
                return "eighth"
                break;
            case 0.09375:
                return "dotted sixteenth"
                break;
            case 0.0625:
                return "sixteenth"
                break;
            case 0.03125:
                return "thirtysecond"
                break;
            default:
                return "unknown";
                break;
        }
    }

    print () {
        console.log("(" + this.pitchDisplay() + ")(" + this.durationDisplay() + ")");
    }

    display () {
        return "(" + this.pitchDisplay() + ")(" + this.durationDisplay() + ")";
    }

    transpose (offset) {
        this.pitch = this.pitch + offset;
    }

}