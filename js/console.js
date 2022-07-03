void function() {
    'use strict';
    var console = document.createElement('div');
    console.id = 'wolfoo-console';
    console.autocapitalize = 'off';
    console.spellcheck = false;
    console.innerHTML = '<style>#wolfoo-console{display:flex;justify-content:center;align-items:center;color:#fff;position:fixed;inset:50px 0;width:40px;height:40px;transition:width 0.5s,height 1s,top 1s;background:#000a;border-radius:0 10px 10px 0;}#wolfoo-console:hover{width:100%;height:40%;border-radius:0;inset:0;z-index:9999;}#wolfoo-console *{display:none;}#wolfoo-console textarea{width:100%;height:100%;resize:none;box-sizing:border-box;border:none;}#wolfoo-console span{font:26px serif;display:initial;}#wolfoo-console button{padding:7px 10px;background:#eaa311;color:#fff;outline:none;border:0;border-radius:5px;}#wolfoo-console:hover span{display:none;}#wolfoo-console:hover *{display:initial;}#wolfoo-console style{display:none !important;}#wolfoo-console textarea{background:transparent;color:#fff;outline:none;}#wolfoo-console button{position:absolute;bottom:5px;right:5px;}</style><span>&blacktriangleright;</span><textarea>console.log(\'Hello World!\');</textarea><button type="button" onclick="Function(this.parentNode.querySelector(\'textarea\').value)();">Run</button>';
    document.body.appendChild(console);
}();