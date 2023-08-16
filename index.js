/**
 * Default FlowShape sample
 */
ej.diagrams.Diagram.Inject(ej.diagrams.UndoRedo);

//Create and add ports for node.
function getNodePorts(obj) {
  var ports = [
    { id: 'nport1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'nport2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'nport3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'nport4', shape: 'Circle', offset: { x: 0.5, y: 0 } },
  ];
  return ports;
}

function addEvents() {
  var isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    var pIcon = document.getElementById('palette-icon');
    if (pIcon) {
      pIcon.addEventListener('click', openPalette, false);
    }
  }
}

function openPalette() {
  var pSpace = document.getElementById('palette-space');
  isMobile = window.matchMedia('(max-width:550px)').matches;
  if (isMobile) {
    if (!pSpace.classList.contains('sb-mobile-palette-open')) {
      pSpace.classList.add('sb-mobile-palette-open');
    } else {
      pSpace.classList.remove('sb-mobile-palette-open');
    }
  }
}

var bounds = document.getElementById('diagram-space').getBoundingClientRect();
var centerX = bounds.width / 2;
//Initializes the nodes for the diagram
var nodes = [
  {
    id: 'NewIdea',
    height: 150,
    width: 200,
    offsetX: centerX - 50,
    offsetY: 30,
    annotations: [
      {
        content: 'Place Order',
      },
    ],
  },
];
//Initializes the Connectors for the diagram

var interval = [
  1, 9, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
  0.25, 9.75, 0.25, 9.75, 0.25, 9.75,
];
var gridlines = { lineColor: '#e0e0e0', lineIntervals: interval };
//Initializes diagram control
var diagram = new ej.diagrams.Diagram({
  width: '100%',
  height: '700px',
  nodes: nodes,

  snapSettings: {
    horizontalGridlines: gridlines,
    verticalGridlines: gridlines,
  },
  //Sets the default values of a node
  getNodeDefaults: function (node) {
    var obj = {};
    if (!obj.children) {
      obj.constraints =
        ej.diagrams.NodeConstraints.Default |
        ej.diagrams.NodeConstraints.AllowDrop;
    }
    return obj;
  },
  drop: drop,
});
diagram.appendTo('#diagram');

function drop(args) {
  var node = args.element;
  var parentNode = args.target;
  setTimeout(() => {
    if (!node.children && node.id !== parentNode.id) {
      if (args.target.parentId) {
        var group = diagram.getObject(args.target.parentId);
        diagram.addChildToGroup(group, node);
      } else {
        diagram.selectAll();
        diagram.group();
      }
    }
  }, 0);
}

//Initialize the flowshapes for the symbol palatte
var shapes = [
  { id: 'terminator', shape: { type: 'Flow', shape: 'Terminator' } },
  { id: 'process', shape: { type: 'Flow', shape: 'Process' } },
  { id: 'decision', shape: { type: 'Flow', shape: 'Decision' } },
];

//Initializes the symbol palette
var palette = new ej.diagrams.SymbolPalette({
  expandMode: 'Multiple',
  palettes: [
    {
      id: 'flow',
      expanded: true,
      symbols: shapes,
      iconCss: 'e-ddb-icons e-flow',
      title: 'Flow Shapes',
    },
  ],
  width: '100%',
  height: '700px',
  symbolHeight: 60,
  symbolWidth: 60,
  getNodeDefaults: function (symbol) {
    if (symbol.id === 'terminator' || symbol.id === 'process') {
      symbol.width = 80;
      symbol.height = 40;
    } else if (
      symbol.id === 'decision' ||
      symbol.id === 'document' ||
      symbol.id === 'preDefinedProcess' ||
      symbol.id === 'paperTap' ||
      symbol.id === 'directData' ||
      symbol.id === 'multiDocument' ||
      symbol.id === 'data'
    ) {
      symbol.width = 50;
      symbol.height = 40;
    } else {
      symbol.width = 50;
      symbol.height = 50;
    }
    symbol.style.strokeColor = '#757575';
  },
  symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
  getSymbolInfo: function (symbol) {
    return { fit: true };
  },
});
palette.appendTo('#symbolpalette');
addEvents();
