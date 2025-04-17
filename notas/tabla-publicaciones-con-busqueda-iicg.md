coge el excell de google docs, que esta compartido como público pero la URL que se pone es de lo que pone arriba en a parte de la dirección
no la url que de da para compartir, lo que en la url pone después de '.../d/'.

Se usa la libreíra 'PapaParse' para manejar el CSV.

En el código de Perpléxiti usa 'const proxyUrl = 'https://cors-anywhere.herokuapp.com/';' y luego en la función de carga de csv también
pero lo he quitado ya que en teoría al tener el excel público no hay problemas de permisos.

El formato para coger el csv es:
'https://docs.google.com/spreadsheets/d/[lo que se ha copiado de la URL]/gviz/tq?tqx=out:csv&sheet=[nombre de la hoja sin espacios]'

También hay en este código el uso de la etiqueta <colgroup> que se usa para reaprtir el 100% entre las columnas que haya.

```html
<colgroup>
    <col style="width:50%;">
    <col style="width:5%;">
    <col style="width:5%;">
    <col style="width:40%;">
</colgroup>

```

### Código

```html
<style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f9fa;
            position: sticky;
            top: 0;
            box-shadow: 0 2px 2px -1px rgba(0,0,0,0.1);
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .search-container {
            margin: 20px 0;
            display: flex;
            gap: 15px;
        }
        input[type="text"] {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 250px;
        }
    </style>
    <h1>Publicaciones Científicas</h1>
    
    <div class="search-container">
        <input type="text" id="searchTitle" placeholder="Buscar por título...">
        <input type="text" id="searchYear" placeholder="Buscar por año...">
       	<input type="text" id="searchAutor" placeholder="Buscar por autor...">
    </div>

    <div style="overflow-x: auto;">
        <table id="csvTable">
          <colgroup>
    <col style="width:50%;">
    <col style="width:5%;">
    <col style="width:5%;">
    <col style="width:40%;">
  </colgroup>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Revista</th>
                    <th>Fecha</th>
                    <th>Autores</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Los datos se insertarán aquí -->
            </tbody>
        </table>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>
    <script>
        //const csvUrl = 'https://docs.google.com/spreadsheets/d/1OVhWOSkejpVEisiveP1R2NlCjcXt6yW_uU1xxQwdfDs/gviz/tq?tqx=out:csv&sheet=Hoja1';//Jorge
      	const csvUrl = 'https://docs.google.com/spreadsheets/d/1gX7oLTF27CSgTF-Hfl8LTAYjGUm6rKerS5OyiA_kRm4/gviz/tq?tqx=out:csv&sheet=Publicaciones-IICG';
        
        // Índices de las columnas según el CSV original
        const COLUMNS = {
            TITULO: 0,
            REVISTA: 1,
            FECHA: 5,
            AUTORES: 7,
            DOI: 3
        };

        async function loadCSV() {
            try {
                Papa.parse(csvUrl, {
                    download: true,
                    header: false,
                    skipEmptyLines: true,
                    complete: function(results) {
                        const tableBody = document.getElementById('tableBody');
                        
                        results.data.forEach((row, index) => {
                            if(index === 0) return; // Saltar encabezados
                            
                            const tr = document.createElement('tr');
                            
                            // Crear celda de título con enlace
                            const titleCell = document.createElement('td');
                          	const parrafo = document.createElement('p'); 
                            const link = document.createElement('a');
                          		if(row[COLUMNS.DOI]){
                                link.href = row[COLUMNS.DOI];
                                link.target = "_blank";
                                link.textContent = row[COLUMNS.TITULO];
                                titleCell.appendChild(link);
                              }else{
                                parrafo.innerHTML = row[COLUMNS.TITULO];
                                titleCell.appendChild(parrafo);
                              }
                            
                            // Crear otras celdas
                            const revistaCell = document.createElement('td');
                            revistaCell.textContent = row[COLUMNS.REVISTA];
                            
                            const fechaCell = document.createElement('td');
                            fechaCell.textContent = row[COLUMNS.FECHA];
                            
                            const autoresCell = document.createElement('td');
                            autoresCell.textContent = row[COLUMNS.AUTORES];
                            
                            // Añadir celdas a la fila
                            tr.append(titleCell, revistaCell, fechaCell, autoresCell);
                            tableBody.appendChild(tr);
                        });
                        
                        addSearchFunctionality();
                    },
                    error: function(err) {
                        console.error('Error al procesar CSV:', err);
                    }
                });
            } catch (error) {
                console.error('Error al cargar CSV:', error);
            }
        }

        function addSearchFunctionality() {
            const searchTitle = document.getElementById('searchTitle');
            const searchYear = document.getElementById('searchYear');
          	const searchAutor = document.getElementById('searchAutor');

            function filterTable() {
                const titleFilter = searchTitle.value.toLowerCase();
                const yearFilter = searchYear.value.toLowerCase();
              	const autorFilter = searchAutor.value.toLowerCase();
                
                document.querySelectorAll('#tableBody tr').forEach(tr => {
                    const title = tr.cells[0].textContent.toLowerCase();
                    const year = tr.cells[2].textContent.toLowerCase();
                   	const autor = tr.cells[3].textContent.toLowerCase();
                    
                    const titleMatch = title.includes(titleFilter);
                    const yearMatch = year.includes(yearFilter);
                  	const autorMatch = autor.includes(autorFilter);
                    
                    tr.style.display = (titleMatch && yearMatch && autorMatch) ? '' : 'none';
                });
            }

            searchTitle.addEventListener('input', filterTable);
            searchYear.addEventListener('input', filterTable);
           	searchAutor.addEventListener('input', filterTable);
        }

        loadCSV();
    </script>

```

---
