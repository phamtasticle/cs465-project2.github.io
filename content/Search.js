var searchArray = [];  //array to hold keywords to search by

function addSearchItem(){
    var item = $("#searchBar").val();

    //add button to display on page
    $(".searchItems").append($("<input></input>")
        .attr({
            'type': 'button',
            'class': 'btn searchDisplay',
            'value': item
        }));

    //add value to search array
    searchArray.push(item);
    return false;
}

function addHealthLabel(){
    var label = $("#healthLabelSelect option:selected").text();

    $(".healthLabelItems").append($("<input></input>")
        .attr({
            'type': 'button',
            'class': 'btn searchDisplay labelDisplay',
            'value': label
        })); 
    
    return false;
}

function submitSearch(){
    var len = searchArray.length;
    console.log("searchArray:")
    for (var i=0; i<len; ++i){
        console.log(searchArray[i]);
    }
}