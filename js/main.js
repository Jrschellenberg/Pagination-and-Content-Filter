/**
 * Created by Justin on 12/22/2016.
 * Plugin used from: http://flaviusmatis.github.io/simplePagination.js/#page-20
 * Code used implementing plugin from: https://github.com/bilalakil/bin/blob/master/simplepagination/page-fragment/index.html
 *
 */
//Making sure all dom elements loaded b4 working on them.
jQuery(function ($) {
    var $pageParts = $(".student-item");
    /*
    Function is used to set up the pagination plugin, hooking it all up together
    pageParts: the jquery object containing all of the items we wish to paginate.
     */
    var paginate = function(pageParts){
        //Setting variable of how many items we require per page
        var itemsPerPage = 10;
        //Making variable of how many items we have.
        var numPages = pageParts.length;
        if(pageParts.length == 0){
            $('#noSearchResults').show();
            console.log("got in here??");
        }
        else {
            $('#noSearchResults').hide();
        }
        //Hiding rest of items except first 10.
        pageParts.slice(itemsPerPage).hide();
        var numberOfPaginations = parseInt(numPages / itemsPerPage + 1);

        $(".pagination").pagination({
            items: numPages,
            itemsOnPage: itemsPerPage,
            cssStyle: 'light-theme',
            displayedPages: 4,
            onPageClick: function (pageNum) {
                //determining which page parts to show.
                var start = itemsPerPage * (pageNum - 1);
                var end = start + itemsPerPage;

                //Hide all page parts
                //Then show the ones we require
                pageParts.hide().slice(start, end).show();
            }
        });

        /*
         This function Adds functionality to allow the traversing of the pagnination using the browsers forward/back functionality
         Code was Implemented using
         https://github.com/bilalakil/bin/blob/master/simplepagination/page-fragment/index.html
         */
        var checkFragment = function () {
            var hash = window.location.hash || "#page-1";
            // we'll use regex to check the hash string as follows:
            // ^            strictly from the beginning of the string (i.e. succeed "#page-3" but fail "hi!#page-3")
            // #page-       exactly match the text "#page-"
            // (            start a matching group (so we can access what's in these parentheses on their own)
            //      \d      any digit ([0-9])
            //      +       one or more of the previous literal (one or more digits)
            // )            end the matching group
            // $            we should now be at the end of the string - if not, then don't match (i.e. fail "#page-3hi!")
            hash = hash.match(/^#page-(\d+)$/);
            if (hash) {
                //A variable to store the page number
                var hashInteger = parseInt(hash[1]);
                //comparing if the link in url matches the pagination bounds of information stored, if so display data
                //if not give feedback to user that there are no results on the current page.
                if (hashInteger > numberOfPaginations) {
                    $('#noResults').show();
                }
                else {
                    $('#noResults').hide();
                }
                // the selectPage function is one of many described in the documentation
                // we've captured the page number in a regex group: (\d+)
                $(".pagination").pagination("selectPage", parseInt(hash[1]));
            }
        }
        $(window).bind("popstate", checkFragment);

    }

    /*Search Functionality.
    Search functionality implemented using example grabbed from
    http://stackoverflow.com/questions/14031369/how-to-implement-search-function-using-javascript-or-jquery
     */
    $("#searchFilter").on("keyup", function () {
        var g = $(this).val().toLowerCase();
        //iterate through all items containing class student-details, grabbing h3 to grab text of this variable.
        $(".student-details h3").each(function () {
            var s = $(this).text().toLowerCase();
            //if the search finds a matching string entered, then
            if (s.indexOf(g) != -1) {
                //Show the item and add a class of searchSelected on its parents parent, ie the list item
                $(this).parent().parent().show().addClass('searchSelected');
            }
            else {
                //hide the item and remove the class if it exists of the list item.
                $(this).parent().parent().hide().removeClass('searchSelected');
            }

        });
        //Reset variable now using only elements containing only class of searchSelected
        $pageParts = $(".searchSelected");
        //recall the paginate functionality.
        paginate($pageParts);
    });
    //Invoking the pagination functionality when page loads
    paginate($pageParts);
});