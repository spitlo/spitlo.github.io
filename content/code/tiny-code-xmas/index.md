+++
title = "Tiny Code Xmas"
description = "Xmas fun on the TIC-80 fantasy console"
date = 2023-12-22

[taxonomies]
technologies = ["Lua"]
+++

I was a little late to the party, but I decided to do the twelve day christmas challenge from Lovebyte, [Tiny Code Christmas 2023](https://tcc.lovebyte.party). It’s really nice, no leaderboard, no pressure, just do the things if you feel like it, whenever you feel like it.

I did all of the challenges in [Lua](https://lua.org/) on the [TIC-80](https://tic80.com) fantasy console.

I haven’t figured out how to embed the carts yet, so until then, these are the code snippets and accompanying short GIFs of the action.

Click the images to see an animated version. I’ve tried my best to decrease the weight of the GIFs but some of them are a few hundred kilobytes. I don’t do any preloading of the images so you’ll probably have to wait a bit before it starts playing. Just hang in there!

Click the images again to avoid epilepsy.

I’m a total noob so I only did the normal challenges and not the extra ones. But perhaps I’ll give them a go once I’m done with the normal ones, this was pretty fun!

## Day 1: Making Shapes

I sort of didn’t do this since I was late, and day two built on the same scene so I just animated it as I worked on it.

## Day 2: Snow time() Like the Present

> Add some basic animation to your scene!

This is my christmas tree, complete with "snow" and "decorations". It’s not the prettiest, but it’s not the worst tree I’ve had either. Some of the "snow" falls upwards, but, I mean, so does real snow, right?

*254 characters*

{{ gifplayer(basename="img/day-02" width="256" height="144") }}

```lua
H=136W=240
h=20M=math
t=0S=M.sin
C=circ
function TIC()cls(8)t=t+.5
C(W/2,9,9,4)
C(W/2,H-2,h,2)
for y=110,10,-7 do
tri(W/2,y,W/2-y,y+h,W/2+y,y+h,y%3+5)end
for b=h,H,9 do
C(H-h-b/2*S(4/2*b),b,S(b)+1*6,b%5)end
for i=1,H do
pix(i*70%W,i*9%H+t%i,9+i%5)end
end
```

## Day 3: Little By Little

> Create a full-screen effect by manipulating each pixel individually!

I don’t know. It swings.

*107 characters*

{{ gifplayer(basename="img/day-03" width="256" height="144") }}

```lua
function TIC()t=time()/3600
for x=0,239 do for y=0,135 do
pix(x,y,x/2+t-y*math.sin(2*math.pi*t))end end end
```

## Day 4: Sines of the Times

> Create an animated plasma effect!

I probably got this "wrong", it sort of zooms out indefinately and becomes very hypnotic after a while. Looks cool, though!

*118 characters*

{{ gifplayer(basename="img/day-04" width="256" height="144") }}
{{ gifplayer(basename="img/day-04b" width="256" height="144") }}

```lua
S=math.sin
function TIC()t=time()/3600
for x=0,239 do for y=0,135 do
c=S(x/24)+S(y/24)+S(t)pix(x,y,c*(t*8))end end end
```

## Day 5: Polar Express

> Create an animated tunnel effect using polar coordinates!

Ok, I must admit I really sucked at this tunnel business. It doesn’t look tunnely at all.

*171 characters*

{{ gifplayer(basename="img/day-05" width="256" height="144") }}

```lua
function TIC()t=time()/90
for x=-120,119 do for y=-68,67 do
X=(math.atan2(y,x))Y=999/(x*x+y*y+1)^.5
c=(X//1)~(Y//1)|(t//1)pix(x+120,y+68,c&11)end end circ(120,68,24,0) end
```

## Day 6: Hello, Demoscene!

> Create an animated sine-scroller effect!

A little reggae flavored background action and a sweet sine scroller.

*255 characters*

{{ gifplayer(basename="img/day-06" width="256" height="144") }}

```lua
t=1
s=math.sin
o='spitlo poerty 2023'
function TIC()T=t%999
for x=0,239 do for y=0,135 do
pix(x,y,(x/2+t-y*s(6*t/999))//2&6)end end
for A=2,4 do for a=0,#o do
print(string.sub(o,a,a),A*3+(s(A))+240+a*39-T,A*3+20+s(T/20+A+a/2)*15,A,1,3+A)end end t=t+1 end
```

## Day 7: Mix and Match

> Show us what you got by combining effects!

Ok, so there’s some kind of plasma beam energy gun going on in the background, and a slightly modified version of the scroller from Day 6 in the forreground. I really like it!

*251 characters*

{{ gifplayer(basename="img/day-07" width="256" height="144") }}

```lua
m=math
B=120K=68t=1s=m.sin
function TIC()T=t%580
for x=-B,B do for y=-K,K do
X=m.atan2(y,x)Y=B/x+y^x
c=X+Y+t/2pix(x+B,y+K,c/3)end end for A=2,4 do for a=0,6 do
print(string.sub('SPITLO',a,a),A+s(A)+240+a*48-T,A+K+s(T/9+A+a)*9,A,1,4+A)end end t=t+1 end
```

## Day 8: Round and Round

> Create an animated tentacle effect by rotating circles!

The Surveillance Snakes are watching! The instructions had the background bars covering the full screen immediately, but in my version the bars sort of slide in from the right until they cover the screen. It looks really nice and glitchy. And the snakes are creepy!

*215 characters*

{{ gifplayer(basename="img/day-08" width="256" height="144") }}

```lua
t=0
M=math
K=M.cos
S=M.sin
function TIC()t=t+0.06
for i=0,4e4 do
x=i%240y=i/240P=pix(x+1,y)pix(x,y,P+1)end
for i=1,5 do a=M.pi*2/5*i+t
circ(120+30*K(a),68+30*S(a/i),4+S(t)*2,0)pix(120+30*K(a),68+30*S(a/i),12)end end
```

## Day 9: Shade the Bob

> Create a classic shadebob effect!

A little shadebob christmas postcard. You can almost see Tinker Bell flying around.

*255 characters*

{{ gifplayer(basename="img/day-09" width="256" height="144") }}

```lua
cls()t=0S=math.sin
for j=0,47 do poke(16320+j,255/(1+2^(5-j%3-j/5)))end
function TIC()x=120+S(2.25*t)*110
y=68+S(3.6*t)*60
for i=-5,5 do for j=-5,5 do
K=pix(x+i,y+j)pix(x+i,y+j,K+1)poke4(x+y*240,K+1)print('MERRY XMAS',4,40,(K+x)^2,6,4)end end t=t+0.01 end
```

## Day 10: The Big Squeeze

> Create a multipart effect and learn about packing!

Of course I had to combine the two most glitchy-looking parts. The GIF doesn’t really do it justice, but it starts off with the plasma beam scroller from Day 7, then the Surveillance Snakes come in and ruin everything for a while, then it goes back to the scroller. Looks really fucked up in a good way.

Half the challenge was getting it down to 256 BYTES using a packer like [Pakettic](https://github.com/vsariola/pakettic) and I haven’t tried that yet. Perhaps my hand crunching has made it harder for the packer to work effectively.

*455 characters*

{{ gifplayer(basename="img/day-10" width="256" height="144") }}

```lua
t=0M=math
K=M.cos
S=M.sin
B=120L=68
function TIC()T=t%400
if T>375 then for i=0,4e4 do
x=i%240y=i/240P=pix(x+1,y)pix(x,y,P+1)end
for i=1,5 do a=M.pi*2/5*i+t
circ(120+30*K(a),68+30*S(a/i),4+S(t)*2,0)
pix(120+30*K(a),68+30*S(a/i),12)end
t=t+0.06
else for x=-B,B do for y=-L,L do
X=M.atan2(y,x)Y=B/x+y^x
c=X+Y+T/2pix(x+B,y+L,c/3)end end for A=2,4 do for a=0,6 do
print(string.sub('SPITLO',a,a),A+S(A)+240+a*48-T,A+L+S(T/9+A+a)*9,A,1,4+A)end end
t=t+1 end end
```

## Day 11: The Third Dimension

> Create a spinning 3D voxel cube!

I went a little crazy on this one, half of the challenge here too was to get the size don using a packer, but I was already in hand crunchimng mode which led to the mess below. 1083 characters, so well over any limit, but I mean the scrolling text alone takes 127.

I think it looks really cool but I should probably stop reusing the sine scroller from Day 6 now.

*1083 characters*

{{ gifplayer(basename="img/day-11" width="256" height="144") }}

```lua
S=math.sin
K=math.cos
T=table
L=0o='spitlo poerty presents... hi contrast lo effort 3D laser xmas intro for the TINY CODE XMAS CHALLENGE... hold on to the night...'
for j=0,47 do poke(16320+j,255/(2.1^(3-j%75)*7))end
function rx(p,a)y=p.y*K(a)-p.z*S(a)z=p.y*S(a)+p.z*K(a)x=p.x
return{x=x,y=y,z=z}end
function ry(p,a)x=p.x*K(a)-p.z*S(a)z=p.x*S(a)+p.z*K(a)y=p.y
return{x=x,y=y,z=z}end
function rz(p,a)x=p.x*K(a)-p.y*S(a)y=p.x*S(a)+p.y*K(a)z=p.z
return{x=x,y=y,z=z}end
function TIC()cls()t=time()/500L=L+.01p={}
for k=1,20,4 do rect(0,4*k,240,24*K(L),3)end
for x=-20,20,5 do for y=-20,20,5 do for z=-20,20,5 do
P=rx({x=x,y=y,z=z},L)P=ry(P,L)P=rz(P,L)T.insert(p,{x=P.x,y=P.y,z=P.z+250})end end end
T.sort(p,function(a,b)return a.z>b.z end)for j=1,#p do
P=p[j]c=S(P.x/99)+K(P.y/99)+S(L)for i=0,2 do circ(120+(S(L)+.3)*999*P.x/P.z-i/2,68+(S(L)+.3)*999*P.y/P.z-i/2,(K(-L)+.3)/999+4-i,c*(L*3)-i)end end
for k=1,5 do
line(0,100+S(L)*k*30,240,100+K(t)*k*30,K(t+k)*12)end
U=t*60%5900
for H=-1,1 do for a=0,#o do
print(string.sub(o,a,a),H/2-240+a*44-U,H+5+90+S(U/20+a/2)*15,H+5,1,6+H)end end end
```

## Day 12: Rockin’ around the Christmas Tree!

> Create a spinning 3D christmas tree!

Mine is not really spinning, more like waddling. But I think it came out nice! At this point I have given up on the packer stuff, I hand crunched this and I’m happy. Thank yous go to everyone at L♥vebyte!!

*832 characters*

{{ gifplayer(basename="img/day-12" width="256" height="144") }}

```lua
S=math.sin
K=math.cos
A=4.5
O='This has been a fun challenge. Thanks to everyone at Lovebyte for arranging this!'
function rx(p,a)y=p.y*K(a)-p.z*S(a)z=p.y*S(a)+p.z*K(a)x=p.x
return{x=x,y=y,z=z}end
function rz(p,a)x=p.x*K(a)-p.y*S(a)y=p.x*S(a)+p.y*K(a)z=p.z
return{x=x,y=y,z=z}end
function TIC()cls()t=time()/400pts={}A=S(t)/9-1.5
for z=1,100,10 do for x=1,360,10 do
X=K(x)*z*.6Y=S(x)*z
P=rx({x=X,y=Y,z=z},A)P=rz(P,A-4.8)table.insert(pts,P)end end
for i=1,#pts do
X=pts[i].x
Y=pts[i].y
if i>50 and i%21==0 then
for j=0,1 do
circ(120-j+X,28-j+Y,3-j,i+j+9)end
else pix(120+X,28+Y,X/Y+22+S(t))end
for k=3,5 do circ(120-k,28,7-k,k)end end
for l=140,1,-1 do
pix(l*70%320,l*12%t*80%l,math.random(11,14))end
T=t*30%950
for m=1,60,30 do for n=0,#O do
print(string.sub(O,n,n),3+S(m)+240+n*8-T,m*3.4+10+S(T/24+m+n/2)*9,T/3+m,1,1)end end end
```

## Misc

To generate the GIFs, I used the F9 screen grab function in TIC-80. The I ran this command to extract a single PNG frame from every GIF:

```bash
for i in {02..12}; do convert "day-""$i"".gif[0]" "day-$i.png"; done
```

The I shrunk and optimized the GIFs using [`gifsicle`](https://www.lcdf.org/gifsicle/):

```bash
gifsicle -b --resize 256x_ -O3 *.gif
```

The PNGs were optimized with ImageOptim.
