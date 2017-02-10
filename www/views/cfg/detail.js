// debugger;
var vm;

// 根据cfg的id获取对应配置的详细内容
var getCfgDetail = function(id) {
  $.post("/api/getCfgDetail", {
    id: id
  }).then(function(data) {
    if(data.errorCode == 0) {
      vm.cfg = data.cfg;
      vm.rawHtml = marked(data.cfg.content);
    } else {
      alert(data.errorInfo);
    }
  })
}

$(function() {

  vm = new Vue({
    el: "#app",
    data: {
      cfg: {},
      rawHtml: "<h1>Hello World</h1>"
    }
  });

  
  getCfgDetail($("#app")[0].dataset.value);

})