function getArticles(page = 1, asc = true){
    let sortOrder = asc ? "asc" : "desc";
    let articlesStr = ``;
    let paginationStr = ``;
    let orderStr = ``;
    let limit = 5;
    $.get('/api/articles/readall', { "page": page, "limit": limit, "sortOrder": sortOrder}, (data) => {
        orderStr += `<button onclick="getArticles(${page}, ${!asc})" id="sortOrderBttn">Order:${sortOrder}</button>`        
        data.items.forEach((element) => {
            articlesStr += `
            <div>
            <h3>${element.title}</h3>
            <p id="artText">${element.text}</p>
            <span id="artclInfo">Author: <u><i>${element.author}</i></u> <b>|</b> 
            Date: ${element.date}</span>
            </div>
            <br/>
            `;
        }, this);
        for(let index = 1; index < data.meta.pages + 1; index++){
            paginationStr += `
            <button onclick="getArticles(${index}, ${asc})"`;
            if(index === page) paginationStr += ` style="background-color:red"`;
            paginationStr += `>${index}</button>
            `;
        }
        $('#sortOrder').empty().append(orderStr);
        $('#pagination').empty().append(paginationStr);
        $("#articles").empty().append(articlesStr);
    });
}
