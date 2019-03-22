const FixedTable = {

  Init: function () {
    FixedTable.tableFixedHeader();
  },

  onLoad: function () {},

  reSize: function () {
    clearTimeout(FixedTable.resizeUpdate);
    FixedTable.resizeUpdate = setTimeout(function () {
      FixedTable.tableFixedWidthResize();
    }, 150);
  },

  tableFixedHeader: function () {
    $('.table--fixed').each(function () {
      var htmlThead = $('<div class="table-container__head"><table class="table"></table></div>'),
          htmlTbody = $('<div class="table-container__body"></div>');

      var table = $(this),
          tableContainer = table.parents('.table-container'),
          tableHead = table.find('.table__thead'),
          tableBody = table.find('.table__tbody');

      tableHead.prependTo(htmlThead.find('table'));
      table.prependTo(htmlTbody);

      tableContainer.append(htmlThead);
      tableContainer.append(htmlTbody);

      FixedTable.tableFixedWidth(tableContainer);
    });
  },

  tableFixedWidth: function (tableContainer) {
    var tableHead = tableContainer.find('.table-container__head'),
        tableBody = tableContainer.find('.table-container__body'),
        tableHeadTable = tableContainer.find('table'),
        tableBodyTable = tableContainer.find('table'),
        tableHeadTh = tableHead.find('th'),
        tableBodyTd = tableBody.find('tbody td');

    tableBodyTable.css({
      'width': 'auto'
    });

    tableHeadTable.css({
      'width': 'auto'
    });

    if (tableHeadTh.length > 0) {
      tableHeadTh.each(function (index, val) {
        var column = tableBodyTd.eq(index);
        theadColumnW = $(val).outerWidth(), columnW = column ? column.outerWidth() : 0;
        fixWidth = columnW > theadColumnW ? columnW : theadColumnW;

        column.css({
          'width': fixWidth
        });

        $(val).css({
          'width': fixWidth
        });
      });
    }

    var tableContainerW = tableContainer.outerWidth();

    tableBodyTable.css({
      'width': tableContainerW
    });

    tableHeadTable.css({
      'width': tableContainerW
    });
  },

  tableFixedWidthResize: function () {
    $('.table-container').each(function () {
      var elem = $(this);
      FixedTable.tableFixedWidth(elem);
    });
  }
};

$(document).ready(function () {
  FixedTable.Init();
});

$(window).on('load', function () {
  FixedTable.onLoad();
});

$(window).on('resize', function () {
  FixedTable.reSize();
});