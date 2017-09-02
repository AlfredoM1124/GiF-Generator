

$(document).ready(function(){

    generateGifs("generator"); 
    
});

$(document).on("click", ".Generate", function(){
    
    if($("#gif-search").val() != ""){
        var searchVal = $("#gif-search").val();
        console.log(searchVal);

        var gifTag = $("<button>");
        gifTag.addClass("gif-button btn").attr("data-gif-value", searchVal).text(searchVal);

        $(".searched-tags").append(gifTag);
        
        generateGifs(searchVal);
        $("#gif-search").val("");
    }
});


$('#gif-search').keypress(function (e) {
    if ((e.which == 13) && ($("#gif-search").val() != "")) {
    var searchVal = $("#gif-search").val();
    console.log(searchVal);
    
    var gifTag = $("<button>");
    gifTag.addClass("gif-button btn").attr("data-gif-value", searchVal).text(searchVal);
    
    $(".searched-tags").append(gifTag);
    
    generateGifs(searchVal);
    $("#gif-search").val("");
    return false;
  }
    else if((e.which == 13)){
        return false;
    }
});


$(document).on("click",".gif-button", function(){
    generateGifs($(this).attr("data-gif-value"));
});
 // API Generator below
function generateGifs(source){
    
    $(".gif-section").empty();
    
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=ffa37e5c89f3436784c2a29cd9d95453&q=" + source + "&limit=20&offset=0&rating=G&lang=en",
        method: "GET"
    }).done(function(response){
        
        var database = response.data;
        
        database.forEach(function(element){
            console.log(element);
            
        var gif = element.images.fixed_height.url;
        var still = element.images.fixed_height_still.url;
            
        var gifDiv = $("<div>").addClass("newGif");
        
        var gifBlock = $("<div>").addClass("row");
        var gifImage =$("<div>").addClass("col-lg-12");
        var image =$("<img>").addClass("img-box").attr("src", still).attr("data-gif", gif).attr("data-still", still);
            
            
        gifImage.prepend(image);
        gifBlock.prepend(gifImage);
        gifDiv.prepend(gifBlock);
    
            
        $(".gif-section").append(gifDiv);    
            
    });
        
        $(".img-box").mouseenter(function(){
            $(this).attr("src", $(this).attr("data-gif"));
        });
        
        $(".img-box").mouseleave(function(){
            $(this).attr("src", $(this).attr("data-still"));
        });
        
    });
}

