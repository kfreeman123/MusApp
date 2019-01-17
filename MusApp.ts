class Bank {
    val = [];

    add (track: Track) {
        this.val.push(track);
    }
}

class Track {
    val = [];

    add (sequence: Sequence) {
        this.val.push(sequence);
    }
}

class Sequence {
    val = [];

    add (note: Note) {
        this.val.push(note);
    }
}

class Note {

    pitch: number;
    duration: number;

    constructor (pitch: number, duration: number) {
        this.pitch = pitch;
        this.duration = duration;
    }

    val () {
        return "(" + this.pitch + ")(" + this.duration + ")";
    }

}

(function Test(){

    // Track 1
    let t1 = new Track();

        let s1 = new Sequence();

        s1.add(new Note(1, 1));
        s1.add(new Note(2, 2));
        s1.add(new Note(3, 3));

        let s2 = new Sequence();

        s2.add(new Note(4, 4));
        s2.add(new Note(5, 5));
        s2.add(new Note(6, 6));
        s2.add(new Note(7, 7));

    t1.add(s1);
    t1.add(s2);

    // Track 2
    let t2 = new Track();

        let s3 = new Sequence();

        s3.add(new Note(8, 8));
        s3.add(new Note(9, 9));

        let s4 = new Sequence();

        s4.add(new Note(10, 10));
  
    t2.add(s3);
    t2.add(s4);

    // Add Tracks 1 and 2 to Bank 1
    let b1 = new Bank();

    b1.add(t1);
    b1.add(t2);

    b1.val.forEach(track => {
        console.log("Track");
        track.val.forEach(sequence => {
            console.log("Sequence");
            sequence.val.forEach(note => {
                console.log(note);
            });
        });
    });

})();