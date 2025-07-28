document.addEventListener("DOMContentLoaded", function () {
    var filterSelect = document.getElementById("filter");
    var inputSearch = document.getElementById("inputSearch");

    inputSearch.addEventListener("input", function () {
        var columnIdx = parseInt(filterSelect.value, 10);
        var filterValue = this.value.toUpperCase();

        var table = document.getElementById("mytable");
        var rows = table.getElementsByTagName("tr");

        for (var i = 1; i < rows.length; i++) {
            var cell = rows[i].getElementsByTagName("td")[columnIdx];
            if (cell) {
                var cellText = cell.textContent || cell.innerText;
                if (cellText.toUpperCase().indexOf(filterValue) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    });
});
