var emptyRow = "<tr><td colspan='6' class='text-center'> Nenhum dados</td></tr>";

  $(document).ready(function () {
    loadDataFromLocal();
    $('#tblData').on('click', '.btn-edit', function () {
      const name = $(this).parent().parent().find(".txtName").html();
      const curso = $(this).parent().parent().find(".txtcurso").html();
      const id = $(this).parent().parent().find(".txtName").attr("data-id");
      $("#txtName").val(name);
      $("#txtcurso").val(curso);
      $("#txtId").val(id);
      $("#btnSave").text("Atualizar");
    });

    $('#tblData').on('click', '.btn-delete', function () {
      const id = $(this).parent().parent().find(".txtName").attr("data-id");
      deleteDataFromLocal(id);
    });

    $("#btnSave").click(function () {
      if ($("#txtId").val() == '') {
        addDataToLocal();
      } else {
        updateDataFromLocal();
      }
    });

    
    /* Function Imagem*/

    $('.btn-selecao').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      var filter = $(this).attr('data-filter');
      if (filter == 'all') {
        $('.image').show(400);
      } else {
        $('.image').not('.' + filter).hide(200);
        $('.image').filter('.' + filter).show(400);
      }
    });

  });

  function clearForm() {
    $("#txtName").val("");
    $("#txtcurso").val("");
    $("#btnSave").text("Adicionar");
  }

  function addEmptyRow() {
    if ($("#tblData tbody").children().children().length == 0) {
      $("#tblData tbody").append(emptyRow);
    }
  }

  function loadDataFromLocal() {
    let localData = localStorage.getItem('localData');
    if (localData) {
      $("#tblData tbody").html("");
      let localArray = JSON.parse(localData);
      let index = 1;
      localArray.forEach(element => {
        let criaTabela = "<tr>";
        criaTabela = criaTabela + "<td> " + index + "</td>";
        criaTabela = criaTabela + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
        criaTabela = criaTabela + "<td class='txtcurso'>" + element.curso + "</td>";
        criaTabela = criaTabela + "    <td class='tdAction text-center'>";
        criaTabela = criaTabela + "        <button class='btn btn-sm btn-success btn-edit'>Editar</button>";
        criaTabela = criaTabela + "        <button class='btn btn-sm btn-danger btn-delete'>Deletar</button>";
        criaTabela = criaTabela + "    </td>";
        criaTabela = criaTabela + " </tr>";
        $("#tblData tbody").append(criaTabela);
        index++;
      });
    }
    addEmptyRow();
  }

  function addDataToLocal() {
    let localData = localStorage.getItem('localData');
    if (localData) {
      let localArray = JSON.parse(localData);
      const obj = {
        id: localArray.length + 1,
        name: $("#txtName").val(),
        curso: $("#txtcurso").val(),
      };
      localArray.push(obj);
      localStorage.setItem('localData', JSON.stringify(localArray));
      loadDataFromLocal();
    } else {
      const arryObj = [];
      const obj = {
        id: 1,
        name: $("#txtName").val(),
        curso: $("#txtcurso").val(),
      };
      arryObj.push(obj);
      localStorage.setItem('localData', JSON.stringify(arryObj));
      loadDataFromLocal();
    }
    clearForm();
  }

  function updateDataFromLocal() {
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    const oldRecord = localArray.find(m => m.id == $("#txtId").val());
    oldRecord.name = $("#txtName").val();
    oldRecord.curso = $("#txtcurso").val();
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
    clearForm();
  }

  function deleteDataFromLocal(id) {
    let localData = localStorage.getItem('localData');
    let localArray = JSON.parse(localData);
    let i = 0;
    while (i < localArray.length) {
      if (localArray[i].id === Number(id)) {
        localArray.splice(i, 1);
      } else {
        ++i;
      }
    }
    localStorage.setItem('localData', JSON.stringify(localArray));
    loadDataFromLocal();
  }