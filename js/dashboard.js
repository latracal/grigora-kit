// for accessibility
toggle_st = document.getElementById("toggle_starter_tempalates");
toggle_st.addEventListener("click", function() {
    var checkbox = document.getElementById("starter_tempalates");   
    checkbox.checked = !checkbox.checked;
});

toggle_blocks = document.getElementById("toggle_blocks");
toggle_blocks.addEventListener("click", function() {
    var checkbox = document.getElementById("advanced_blocks");   
    checkbox.checked = !checkbox.checked;
});

toggle_toc = document.getElementById("toggle_toc");
toggle_toc.addEventListener("click", function() {
    var checkbox = document.getElementById("table_of_content");   
    checkbox.checked = !checkbox.checked;
});