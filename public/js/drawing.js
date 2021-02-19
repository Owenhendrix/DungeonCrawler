/*global $*/
let canvas = {};
let ctx = {};
let _dungeon_size = 10; //10x10
let _dungeon = [];

$(function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    _dungeon = createDungeon(_dungeon_size);
    
    drawGrid(_dungeon_size*50,_dungeon_size*50,50);
});


let drawGrid = function(w, h, size) {
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    for (let x = 0; x <= w; x += size) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        for (let y = 0; y <= h; y += size) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
    }
    ctx.stroke();
};

function createDungeon(size){
    
    let d=[];
    d.length = size;
    
    for(let x=0; x<size; x++){
        d[x] = [];
        for(let y=0; y<size; y++){
            
            let dungeon_copy = JSON.parse(JSON.stringify(d)); //Make a copy of this dungeon
            
            let room = createRoom(x,y,d);
            
            d[x].push({x:x,y:y,room:room});
        }
    }
    return d;
}

function createRoom(x,y,dungeon){
    
    let room = {
        floor:'stone',
        doors:[],
        contents:[]
    }
    
    //TODO for later
    /*
        peeking into neighboring rooms of the dungon.  If the room has
        already been created, then that might give us hints as to what 
        this room looks like.  i.e if the room to the north of us, has
        a door to the south then that means this new room must have a 
        door to the north.
        
        north = dungeon[x+1][y];
        south = dungeon[x-1][y];
        east = dungeon[x][y-1];
        west = dungeon[x][y+1];
    */
    
    room.floor = 'dirt';
    
    let number_of_doors = getRandomNumber(0); //between 0 & 3
    for(let i=0; i<number_of_doors; i++){
        
        //TODO:  You might get the same door more than once.  Add code to prevent to of the same door
        room.doors.push(getRandomDoor());
    }
    
    //Add contents to the room
    room.contents.push({type:'envrionment',air:true});
    
    //TODO: Make these random
    room.contents.push({type:'item',item:'dagger'});
    room.contents.push({type:'creature', creature:'bugbear'});
    room.contents.push({type:'item',item:'table',description:'table push to the north side of the wall.  Some stale half eaten bread is molding next to a dry wine flagon'});
            
    return room;
}



function getRandomNumber(max){
    return Math.floor( Math.random() * Math.floor(max) );
}

function getRandomDoor(){
    let r =getRandomNumber(doors.length);
    return doors[r];
}

let doors = [
    {location:'north',locked:false, description:''},
    {location:'south',locked:false},
    {location:'east',locked:false, description:''},
    {location:'west',locked:false, description:''},
    {location:'above',locked:true, description:'Trap door in the cieling.  Very sturdy.  Will not budge'}
]
