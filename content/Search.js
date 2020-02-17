function addSearchItem(){
    var item = document.getElementsByClassName("searchBar");

    $(".searchItems").append('<input type="button" class="btn searchDisplay" value=item>');
 /*
    $(".searchItems").append("<input>")
        .attr({
            'type': 'button',
            'class': 'btn searchInput',
            'value': item.value
        });
        */
}