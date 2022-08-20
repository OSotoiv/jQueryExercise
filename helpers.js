function sortBy(col, order, th) {
    // console.log(th.data('orderby'));
    console.log('sorting by', col, order);
    //make array of title and ratings values side by side
    const td = $('tbody td').get().reduce((arr, nextVal) => {
        //filter out buttons
        if (nextVal.innerText !== 'x') {
            arr.push(nextVal.innerText);
        }
        return arr;
    }, []);
    //make array of objects with {title: ""; rating: 10}
    tdOBJs = [];
    for (let i = 0; i < td.length; i += 2) {
        let obj = { title: td[i], rating: parseInt(td[i + 1]) }
        tdOBJs.push(obj);
    }
    //arrange the array of objects inplace asc or desc
    if (order == "ascending") {
        if (col == 'title') {
            tdOBJs.sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
        } else {
            tdOBJs.sort((a, b) => a[col] > b[col] ? 1 : -1);
        }
        th.data('orderby', "descending");
    } else {
        if (col === 'title') {
            tdOBJs.sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
        } else {
            tdOBJs.sort((a, b) => a[col] < b[col] ? 1 : -1);
        }
        th.data('orderby', "ascending");
    }
    //empty old table
    $('tbody').contents().remove();
    rebuildTable(tdOBJs);
}
//rebuilds table with sorted array of objects
function rebuildTable(tdOBJs) {
    for (let data of tdOBJs) {
        $('tbody')
            .append(`<tr>
                        <td>${data.title}</td>
                        <td>${data.rating}</td>
                        <td><button class="btn btn-danger btn-small">x</button></td>
                    </tr>`);
    };
}
