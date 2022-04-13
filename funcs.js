CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
};

function d(i) {
  return document.getElementById(i);
}

d('t').innerHTML = d('t').innerHTML.trim() + '\n\n';

function filer(dox) {
  d('f').addEventListener('change', function () {
    var files = d('f').files;
    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      reader.readAsText(files[i], 'UTF-8');
      reader.onload = function (evt) {
        dox(evt.target.result);
      };
    }
  });
}

function gen(val) {
  const regexpSize = /^(.*?)\n(.*?)\n\n/gms;
  var vals = [];

  val.match(regexpSize).forEach((v) => {
    var xpl = v.trim().split('\n');
    var title = xpl[0];
    var more = [];
    xpl.forEach((vv, i) => {
      if (i > 0) {
        more.push(vv);
      }
    });

    vals.push({
      title: title,
      text: more,
    });
  });

  return vals;
}

function frame3(inp) {
  var me = {};

  var xgen = function (elm) {
    $(elm).on('change keyup', () => {
      me.gen();
    });
  };

  var canv = document.createElement('canvas');
  canv.style.direction = 'rtl';
  canv.style.backgroundColor = 'green';
  var ctx = canv.getContext('2d');

  canv.height = inp.height;
  canv.width = inp.width;

  var sections = (canv.height - inp.titlefontsize) / 3;
  var pos = inp.titlefontsize;

  me.poses = [];
  me.titles = [];
  me.texts = [];
  me.textsizes = [];

  var controller;

  for (var x = 0; x <= 2; x++) {
    var posval = document.createElement('input');
    posval.type = 'range';
    posval.min = 0;
    posval.max = inp.height;
    posval.value = pos;
    xgen(posval);
    me.poses.push(posval);
    pos += sections;

    var title = document.createElement('textarea');
    title.innerHTML = inp.vals[x].title;
    xgen(title);
    me.titles.push(title);

    var text = document.createElement('textarea');
    text.innerHTML = inp.vals[x].text.join('\n');
    xgen(text);
    me.texts.push(text);

    var textsize = document.createElement('input');
    textsize.type = 'range';
    textsize.min = 0;
    textsize.max = inp.height;
    textsize.value = inp.textfontsize;
    xgen(textsize);
    me.textsizes.push(textsize);
  }

  me.gen = () => {
    setTimeout(() => {
      ctx.fillStyle = inp.bg;
      //  ctx.fillRect(0, 0, inp.width, inp.height);
      ctx.fillStyle = 'black';
      ctx.textAlign = 'right';

      ctx.drawImage(inp.img, 0, 0, inp.width, inp.height);

      ctx.globalAlpha = 0.7;
      ctx.fillStyle = '#FFFFFF';
      ctx
        .roundRect(
          inp.width * 0.02,
          inp.height * 0.02,
          inp.width - inp.width * 0.04,
          inp.height - inp.height * 0.04,
          20
        )
        .fill();

        ctx.globalAlpha = 1;

      for (var x = 0; x <= 2; x++) {

        
        ctx.font = 'bold '+inp.titlefontsize + 'px '+inp.font;
       

        ctx.fillStyle = '#000000';

        ctx.fillText(
          $(me.titles[x]).val(),
          inp.width - inp.width * 0.03,
          parseInt(me.poses[x].value) + inp.width * 0.01
        );

        ctx.font = ' '+inp.titlefontsize + 'px '+inp.font;


        var canvasTxt = window.canvasTxt.default;
        canvasTxt.font = inp.font
        canvasTxt.fontSize = parseInt($(me.textsizes[x]).val());
        canvasTxt.align = 'right';
        canvasTxt.vAlign = 'top';
        canvasTxt.fontWeight = ''
        canvasTxt.justify = true;
        canvasTxt.drawText(
          ctx,
          $(me.texts[x]).val(),
          inp.width * 0.02,
          parseInt(me.poses[x].value) +
            parseInt($(me.textsizes[x]).val()),
          inp.width - inp.width * 0.05,
          sections
        );
      }
    }, 100);
  };

  me.elem = canv;
  return me;
}

function gen12mah(inp) {

  inp.img.crossOrigin = 'Anonymous';
  inp.img.setAttribute('crossOrigin', '');


  var singlefal = inp.fal
  var davazdah = [];

  const chunkSize = 3;
  for (let i = 0; i < singlefal.length; i += chunkSize) {
    const chunk = singlefal.slice(i, i + chunkSize);

    var x = frame3({
      font:inp.font,
      height: inp.height,
      width: inp.width,
      bg: 'grey',
      titlefontsize: inp.width*0.08,
      textfontsize: inp.width*0.04,
      vals: chunk,
      img:inp.img
    });

    x.gen();
    davazdah.push(x);
  }

  return davazdah;
}

function gencover(inp) {
  var title = inp.title
  var me = {};
  var canv = document.createElement('canvas');
  canv.style.width = '100%';
  canv.style.backgroundColor = 'green';
  canv.width = inp.width;
  canv.height = inp.height;
  canv.style.direction = 'rtl';
  var ctx = canv.getContext('2d');

  ctx.drawImage(inp.img, 0, 0, inp.width, inp.height);

  ctx.globalAlpha = 0.7;
  ctx.fillStyle = 'yellow';
 // ctx.fillRect(0, canv.height * 0.4, canv.width, canv.height * 0.5);

 
  ctx.fillStyle = 'black';
  var canvasTxt = window.canvasTxt.default;
  canvasTxt.font = inp.font
  canvasTxt.fontSize = parseInt((canv.height * 0.4) / 3);
  canvasTxt.align = 'center';
  canvasTxt.vAlign = 'middle';
  canvasTxt.justify = true;
  canvasTxt.fontWeight = 'bold';
  canvasTxt.strokeStyle = 'red';

  canvasTxt.lineHeight = parseInt((canv.height * 0.4) / 3) * 1.5;

  ctx.globalAlpha = 1;
    globstork = {
    color: 'white',
    size: parseInt((canv.height * 0.4) / 6),
  };

  setTimeout(() => {

 /*   canvasTxt.drawText(
      ctx,
      title,
      0,
      canv.height * 0.39,
      canv.width,
      canv.height * 0.4
    );
*/
globyy = [];
globhh = [];

ctx.globalAlpha = 0;

    canvasTxt.drawText(
      ctx,
      title,
      0,
      0,
      canv.width,
      canv.height
    );
    console.log(globyy)
    console.log(globhh)


  ctx.globalAlpha = 0.7;
  ctx.fillStyle = 'yellow';

 ctx.fillRect(0, globyy[0]-globhh[0],inp.width,globyy[globyy.length-1]-globhh[globhh.length-1]);
  globyy = [];
  globhh = [];
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'black';
  canvasTxt.drawText(
      ctx,
      title,
      0,
      0,
      canv.width,
      canv.height
    );

  globyy = [];
  globhh = [];

  globstork = false;
/**/

  ctx.fillStyle = 'white';
  var canvasTxt2 = window.canvasTxt.default;
  canvasTxt2.font = inp.font2
  canvasTxt2.fontSize = parseInt((canv.height * 0.4) / 3);
  canvasTxt2.align = 'center';
  canvasTxt2.vAlign = 'bottom';
  canvasTxt2.justify = true;

  canvasTxt.drawText(
      ctx,
      "anjelaworld@",
      0,
      0,
      canv.width,
      canv.height-canv.height*0.05
    );

/**/

    
  }, 100);

  me.elem = canv;
  return me;
}

function render(inp) {
  var startframe = -1;

  var canv = document.createElement('canvas');



  canv.height = inp.width;
  canv.width = inp.height;

  var ctx = canv.getContext('2d');

  var counter = 0;
  var flipflop = true;
  var beginfal = false;

  var incc = () => {};

  var d = (fx) => {
    if (startframe < 0) {
      startframe = fx;
    }
    var f = fx - startframe;

    var seconds = Math.round(f / 1000);

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, inp.width, inp.height);

    if (f < 500) {
      counter = 0;
    } else {
      if (!beginfal) {
        counter = 1;
        beginfal = true;
      
      }

      if (seconds % 15 == 0) {
        if (!flipflop) {
          flipflop = true;

          counter++;
        
        }
      } else {
        if (flipflop) {
          flipflop = false;
          // counter++
        }
      }
    }

    if (typeof inp.allframes[counter] != 'undefined') {
      ctx.drawImage(inp.allframes[counter], 0, 0);
    }

    if (seconds <= 59) {
      requestAnimationFrame(d);
    }
  };

  setTimeout(() => { requestAnimationFrame(d)}, 100);
 

  var dlx = $('<div>...</div>');
  var exportVid = function (blob) {
    const vid = document.createElement('video');
    vid.src = URL.createObjectURL(blob);
    vid.controls = true;
    const a = document.createElement('a');
    a.download = 'myvid.webm';
    a.href = vid.src;
    a.textContent = 'download';
    dlx.append($(a));
  };

  const stream = canv.captureStream();
  const rec = new MediaRecorder(stream);

  const chunks = [];
  rec.ondataavailable = (e) => {

    chunks.push(e.data)
  };

  rec.onstop = (e) => {
    
    exportVid(new Blob(chunks, { type: 'video/webm' }))};

 
  setTimeout(() => {  rec.start();}, 100);

  setTimeout(() => rec.stop(), 59000);

  return dlx;
}

function loadfont(fname) {
   $(document.body).append('<div style="font-family:'+fname+';visibility:hidden">فونت</div>')
}

function fal(inp) {

 loadfont(inp.titlefont);
 loadfont(inp.textfont);
 loadfont(inp.tagfont)

  var thisfal = $(
    '<div style="overflow:scroll;height:350px; white-space: nowrap;"></div>'
  );

  var covccont = $(
    '<div style="display:inline-block;margin-left:2rem;width:300px;vertical-align: top;"></div>'
  );

  thisfal.append(covccont);

  var singlefal = gen(inp.text);
  var faltitle = singlefal[0];


  covccont.append(
    gencover({font2:inp.tagfont,font:inp.titlefont,title:faltitle.title + '\n' + faltitle.text.join('\n')+"",width:inp.width,height:inp.height,img:inp.img}).elem
  );

  singlefal.splice(0, 1);

  gen12mah({font:inp.textfont,fal:singlefal,width:inp.width,height:inp.height,img:inp.img}).forEach((e) => {
    e.elem.style.width = '100%';

    var ccont = $(
      '<div style="display:inline-block;margin-left:2rem;width:300px"></div>'
    );

    ccont.append($(e.elem));
    var controler = $('<div></div>');

    controler.hide();

    e.titles.forEach((t, i) => {
      controler.append($(e.textsizes[i]));
      controler.append('<br>');
      controler.append($(e.poses[i]));
      controler.append('<br>');
      controler.append($(t));
      controler.append('<br>');
      controler.append($(e.texts[i]));
      controler.append('<hr>');
    });

    ccont.append(controler);

    thisfal.append(ccont);
  });

  var alfalsframe = $('canvas', thisfal);

  thisfal.append(
    $('<button>gen</button>').click(() => {
      thisfal.append(render({allframes:alfalsframe,width:inp.width,height:inp.height}));
    })
  );

 return thisfal
}