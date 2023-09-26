// add control button
document.querySelector('.control-buttons span').onclick = function(){
    let yourName = prompt("What's your name");
    if(yourName == null || yourName == ''){
        document.querySelector(".name span").innerHTML = "Unknown";
    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange)

// loop on the blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function(){
        flibBlock(block);
    });
});

// flibBlock function
function flibBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');
    let allFlipedBlocks = blocks.filter(flibedblock => flibedblock.classList.contains('is-flipped'));

    if(allFlipedBlocks.length === 2){
        stopClicking();
        matchBlocks(allFlipedBlocks[0], allFlipedBlocks[1]);
    }
};

// stopClicking function
function stopClicking(){
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
    blocksContainer.classList.remove('no-clicking');
    }, duration);
};

function matchBlocks(firstBlock, secondBlock){
    let tries = document.querySelector('.tries span');
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

// shuffle function
function shuffle(array){
    let current = array.length,
        temp,
        random;
    while( current > 0){
        random = Math.floor(Math.random() * current);
        current--;

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;

        return array;
    }    
};