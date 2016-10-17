
/**
 * Created by yang.liu on 2016/3/30.
 */
function canvas_bg(url,worlUrl){
    $(".moreworks").on("click",function(){
        img_update();
    })
    
    $("#canvas").attr("width",$(window).width()<1200?1200:$(window).width());
    var showNum = 8;
    var last = 0;
    var amount = last + showNum;
    var width;
    var height;
    var canvas = document.getElementById("canvas");
        context = canvas.getContext("2d"),
        width = canvas.width;
          height = canvas.height,
        minDistance = 10,
        maxDistance = 350,
        minDistance2 = minDistance * minDistance,
        maxDistance2 = maxDistance * maxDistance;

    var tau = 2 * Math.PI,
        pn = 40,//number of points to add
        particles = new Array(pn);

    for (var i = 0; i < pn; ++i) {
        particles[i] =
        {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            r: Math.random()*10+3
        };
    }
    $(window).resize(resizeCanvas);
    function drawBgPoints()
    {
        context.save();
        context.clearRect(0, 0, width, height);

        for (var i = 0; i < pn; ++i) {
            var p = particles[i];
            p.x += p.vx; if (p.x < -maxDistance) p.x += width + maxDistance * 2; else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
            p.y += p.vy; if (p.y < -maxDistance) p.y += height + maxDistance * 2; else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
            p.vx += 0.3 * (Math.random() - .5) - 0.02 * p.vx;
            p.vy += 0.3 * (Math.random() - .5) - 0.02 * p.vy;

            context.beginPath();
            context.arc(p.x, p.y, p.r, 0, tau);
            context.fillStyle = "#ddd";
            context.fill();
        }

        for (var i = 0; i < pn; ++i) {
            for (var j = i + 1; j < pn; ++j) {
                var pi = particles[i],
                    pj = particles[j],
                    dx = pi.x - pj.x,
                    dy = pi.y - pj.y,
                    d2 = dx * dx + dy * dy;
                if (d2 < maxDistance2) {
                    context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                    context.beginPath();
                    context.moveTo(pi.x, pi.y);
                    context.lineTo(pj.x, pj.y);
                    context.strokeStyle = "#eee";
                    context.stroke();
                }
            }
        }
        context.restore();
    }

    d3.timer(function()
    {
        drawBgPoints();
    });


    var padding = 6, // separation between nodes
        maxRadius = 70;
    var _img_scale=160;  //划入圆 变大半径
    var n,m = 2;
    var imgObj = [],url = url, worlUrl = worlUrl, img_r, img_r_start,pi_obj,pi_gran,pi_bai,pi_lan,pi_txt,pi_Conta,renderer,circle,nodes,stage,stage1,isposition=true;

    var img_padding= 1,force;
    var startX,startY,endX,endY;
    
    var canvas_in=1920;

    if (!!window.ActiveXObject || "ActiveXObject" in window)canvas_in=width;


    //初始化pixi 添加canvas
    renderer = PIXI.autoDetectRenderer(canvas_in, height,{ transparent: true,antialias: true });
    renderer.view.style.top="0px";
    renderer.view.style.position="absolute";
    renderer.view.style.left="0px";
    renderer.view.id="canvas2";
    $(".work").append(renderer.view);
    $("#canvas2").attr("width",width);




    // create the root of the scene graph
    work();
    function svg_circle(){

        var romImg=Math.round(Math.random()*9+1)
        romImg=8
        imgObj=[
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease0.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease1.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease2.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease3.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease4.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease5.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease6.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease7.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease8.html"},
            {"imgUrl":"/Public/Images/templet/work/layer"+romImg+".png","imgDesc":"Happy Weekend/nHappy Holiday/n同城","imgLink":"ease9.html"},
        ]
        n = imgObj.length;// total number of nodes   ͼƬ����
        img_r=[]
        img_r_start=[] ;
        pi_obj=[];
        pi_gran=[];
        pi_bai=[];
        pi_lan=[];
        pi_txt=[];
        pi_Conta=[];
        img_padding=1;
        canvas = document.getElementById("canvas");
        width = canvas.width;
        height = canvas.height;
        for(var i=0;i<n;i++){
            //img_r.push(50+Math.random()*60)  //设置半径
            img_r.push(50+Math.random()*60)  //设置半径
            img_r_start.push(img_r[i])

        }
        pixi();
        console.log(d3.scale)
        var color = d3.scale.category10()
            .domain(d3.range(m));

        var x = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangePoints([500, width-500], 2);
        var img_id=0;
            nodes = d3.range(n).map(function() {
            var i = Math.floor(Math.random() * m),
                v = (i + 1) / m * -Math.log(Math.random());
            return {
                radius:img_r[img_id],
                cx: x(i),
                cy: height / 2,
                imgId:img_id++
            };
        });

        force = d3.layout.force()
            .nodes(nodes)
            .size([width, height])
            .gravity(0)
            .charge(0)
            .on("tick", tick)
            .start();

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "svg")
            .style("top", "0")
            .style("left", 0)
            .style("position", "absolute");

        $(".work").append($("#svg"));
        $("body>svg").remove();
         circle = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", function(d) {return d.radius; })
        .attr("id", function(d) {return "circle"+d.imgId;})
        .style("cursor","pointer")
        .style("opacity",0)
        .call(force.drag);
        var img_index;
        for(var i=0;i<n;i++){

            //TweenMax.to($("#circle"+i)[0].scale, 0.6, {x:1.2,y:1.2,ease:Strong.easeOut});


            $("#circle"+i).on("mouseover",function(e){
                isposition=true;
                force.start()
                var index=e.target.id;
                img_index = parseInt(index.replace(/[^0-9]/ig,""));

                //显示浮层小球
                $("#circle"+img_index).attr("r",_img_scale);
                TweenMax.to(pi_Conta[img_index].scale, 0.6, {x:1,y:1,ease:Strong.easeOut});

                //显示蓝色的圆背景
                pi_lan[img_index].clear();
                pi_lan[img_index].beginFill(0x0c3e70,0.7);
                pi_lan[img_index].lineStyle(0);
                pi_lan[img_index].drawCircle(_img_scale*4, _img_scale*4,_img_scale*6);
                pi_lan[img_index].endFill();

                TweenMax.to(pi_txt[img_index], 1, {alpha:1,ease:Strong.easeOut});
            }).on("mouseout",function(e){
                isposition=false;
                $("#circle"+img_index).attr("r",img_r_start[img_index])
                force.start()
                TweenMax.to(pi_Conta[img_index].scale, 0.6, {x:img_r_start[img_index]/_img_scale-img_padding/_img_scale,y:img_r_start[img_index]/_img_scale-img_padding/_img_scale,ease:Strong.easeOut});
                TweenMax.to(pi_txt[img_index], 0.4, {alpha:0,ease:Strong.easeOut});
                pi_lan[img_index].clear();
            }).on("mousedown",function(event){
                startX=event.pageX;
                startY=event.pageY;
            }).on("mouseup",function(event){
                endX=event.pageX;
                endY=event.pageY;
                var index=event.target.id;
                index = index.replace(/[^0-9]/ig,"");
                console.log(index)
                if(Math.abs(endX-startX)<20&&Math.abs(endY-startY)<20){
                    window.open(imgObj[index].imgLink);
                }


            });
        }

        isposition=false;

    }

    // Move nodes toward cluster focus.
    function gravity(alpha) {

        return function(d) {
            d.y += (d.cy - d.y) * alpha;
            d.x += (d.cx - d.x) * alpha;
        };
    }
    function tick(e){
        circle
            .each(gravity(.2 * e.alpha))
            .each(collide(.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });


        for(var i=0;i<n;i++){
            nodes[i].radius=pi_Conta[i].scale.x*_img_scale;
            var _x=parseFloat($("#circle"+i).attr("cx"))-img_r[i];
            var _y=parseFloat($("#circle"+i).attr("cy"))-img_r[i];
            pi_Conta[i].x =_x-(pi_Conta[i].scale.x-img_r_start[i]/_img_scale)*_img_scale;
            pi_Conta[i].y=_y-(pi_Conta[i].scale.x-img_r_start[i]/_img_scale)*_img_scale;

        }

    }
    function pixi(){
        stage = new PIXI.Container();
        stage1.addChild(stage);
        for (var j = 0; j < n; j++) {

            var Container = new PIXI.Container();
            Container.scale.set(img_r[j]/_img_scale-img_padding/_img_scale)


            var graphics = new PIXI.Graphics();
            graphics.lineStyle(0);
            graphics.beginFill(0,0.5);
            graphics.drawCircle(_img_scale,_img_scale,_img_scale);
            graphics.endFill();

            //创建案例对应的图
            var bunny = PIXI.Sprite.fromImage(imgObj[j].imgUrl);
            bunny.x = 0;
            bunny.y = 0;
            bunny.width=_img_scale*2;
            bunny.height=_img_scale*2;

            bunny.mask=graphics;

            //蓝色的背景
            var lan = new PIXI.Graphics();
            //lan.beginFill(0x000000);
            //lan.beginFill(0xFF0000);
            //lan.lineStyle(4, 0xffd900, 1);

            var textSample = new PIXI.Text(imgObj[j].imgDesc, { font: '18px Georgia-Italic', fill: 'white' });

            textSample.position.x=bunny.width/2;
            textSample.position.y=bunny.height/2;
            textSample.anchor.set(0.5);
            textSample.alpha=0;

            Container.addChild(bunny);
            Container.addChild(graphics);
            Container.addChild(textSample);
            bunny.addChild(lan);
            stage.addChild(Container);



            pi_obj.push(bunny)
            pi_txt.push(textSample)
            pi_lan.push(lan)
            pi_Conta.push(Container)


        }

    }
    function strgetShortForm(str,len){
        var tempStr="";
        var count=1;
        var str_index=0;
        if(strgetLength(str)>len){
            var i=0;
            for(var z=1;z<=strgetLength(str);z++){
                if(str.charCodeAt(z-1)>255){
                    i=i+2;
                }else{
                    i=i+1;
                }
                if(i>=len*count){
                    count+=1;
                    var tmp=str.substring(str_index, z);
                    tempStr+=tmp+"\n";
                    str_index=z;
                }
            }
            tempStr+=str.substring(tempStr.length-count+1,str.length);
            return tempStr;
        }else{
            return str+"";
        }
    }
    function strgetLength(str){
        var text=str.replace(/[^\x00-\xff]/g,"**");
        return text.length;
    }
    // Resolve collisions between nodes.
    function collide(alpha) {

        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {

            var r = d.radius + maxRadius + padding ,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
    var Width2=document.documentElement.clientWidth||document.body.clientWidth;
    function resizeCanvas(){
        if (!!window.ActiveXObject || "ActiveXObject" in window)return;
        var winWidth=document.documentElement.clientWidth||document.body.clientWidth;
        if(winWidth<1200)winWidth=1200;
           $("#canvas2").attr("width",winWidth);
           $("#svg").attr("width",winWidth);




           for(var j=0;j<nodes.length;j++){
               nodes[j].cx+=(winWidth-Width2)/2;
               if(nodes[j].cx<200)nodes[j].cx=200;
               if(nodes[j].cx>width-200)nodes[j].cx=width-200;
           }

           Width2=winWidth
           width = winWidth;

           $("#canvas").attr("width",$(window).width())
           pn = 30*width/1000;
           for (var i = 0; i < pn; ++i) {
               particles[i] =
               {
                   x: Math.random() * width,
                   y: Math.random() * height,
                   vx: 0,
                   vy: 0,
                   r: Math.random()*10+3
               };
           }




    }
    function animate() {
        requestAnimationFrame(animate);

        // render the root container
        renderer.render(stage1);
        if(isposition)return;
        force.start()
        for(var j=0;j<nodes.length;j++){
            nodes[j].cx+=Math.random()*10-5;
            nodes[j].cy+=Math.random()*10-5;
            if(nodes[j].cx<200)nodes[j].cx=200;
            if(nodes[j].cx>width-200)nodes[j].cx=width-200;
            if(nodes[j].cy<150)nodes[j].cy=150;
            if(nodes[j].cy>height-150)nodes[j].cy=height-150;
        }
    }
    //function img_update(){

        //imgObj = imgObj;
        
        //renderer.view.style.left=$("#svg").css("left");

    //}
    function img_update(){
        TweenMax.to(stage, 0.4, {alpha:0});
        setTimeout(function(){
            $("#svg").remove()
            work()
        },200)
    }
    function work(){
        stage1 = new PIXI.Container();
        new svg_circle();
        animate();
        return false;
        $.post(url,{'last':last,'amount':showNum},function(re){
            svg = $("#svg").html();
            length = re.data.length;
            if(length > 0){
                if(length < 8 && length != 0){
                    last = 0;
                }else if(re.start){
                    last = 8;
                }else{
                    last += showNum;
                }
                imgObj = [];
                for (var i = 0; i < length; i++) {
                    imgLink = worlUrl + "/caseid/" + re.data[i].id; 
                    project_title = re.data[i].project_title != null ? decodeURIComponent(re.data[i].project_title) : '';
                    customer = re.data[i].customer != null ? re.data[i].customer : '';
                    imgDesc = project_title + "\n\r" + customer;
                    imgObj[imgObj.length] = {"imgUrl":re.data[i].home_icon,"imgDesc":imgDesc,"imgLink":imgLink};
                };
                stage1 = new PIXI.Container();
                svg_circle(imgObj)//imgs
                animate();
               // img_update();
            }else{
                new img_update([]);
            }
            return ;
        })
    }
}

var work_data = "/work/data",work_index = "/work/index";
new canvas_bg(work_data,work_index);




