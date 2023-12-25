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

~~I’m a total noob so I only did the normal challenges and not the extra ones. But perhaps I’ll give them a go once I’m done with the normal ones, this was pretty fun!~~

EDIT: I had fun with this so I’ll keep going with the extras for a while.

EDIT 2: TIL about the colon-call syntax, so I’ve updated the code for all snippets using `string.sub` to use it, knocking off a few characters more. I’ve left the old size in for posterity.

## Day 1: Making Shapes

I sort of didn’t do this since I was late, and day two built on the same scene so I just animated it as I worked on it.

## Day 2: Snow time() Like the Present

> Add some basic animation to your scene!

This is my christmas tree, complete with "snow" and "decorations". It’s not the prettiest, but it’s not the worst tree I’ve had either. Some of the "snow" falls upwards, but, I mean, so does real snow, right?

*254 characters*

{{ gifplayer(basename="img/day-02" width="512" height="288") }}

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

{{ gifplayer(basename="img/day-03" width="512" height="288") }}

```lua
function TIC()t=time()/3600
for x=0,239 do for y=0,135 do
pix(x,y,x/2+t-y*math.sin(2*math.pi*t))end end end
```

## Day 4: Sines of the Times

> Create an animated plasma effect!

I probably got this "wrong", it sort of zooms out indefinately and becomes very hypnotic after a while. Looks cool, though!

*118 characters*

{{ gifplayer(basename="img/day-04" width="512" height="288") }}
{{ gifplayer(basename="img/day-04b" width="512" height="288") }}

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

{{ gifplayer(basename="img/day-05" width="512" height="288") }}

```lua
function TIC()t=time()/90
for x=-120,119 do for y=-68,67 do
X=(math.atan2(y,x))Y=999/(x*x+y*y+1)^.5
c=(X//1)~(Y//1)|(t//1)pix(x+120,y+68,c&11)end end circ(120,68,24,0) end
```

## Day 6: Hello, Demoscene!

> Create an animated sine-scroller effect!

A little reggae flavored background action and a sweet sine scroller.

*~~255 characters~~ 248 characters*

{{ gifplayer(basename="img/day-06" width="512" height="288") }}

```lua
t=1
s=math.sin
o='spitlo poerty 2023'
function TIC()T=t%999
for x=0,239 do for y=0,135 do
pix(x,y,(x/2+t-y*s(6*t/999))//2&6)end end
for A=2,4 do for a=0,#o do
print(o:sub(a,a),A*3+(s(A))+240+a*39-T,A*3+20+s(T/20+A+a/2)*15,A,1,3+A)end end t=t+1 end
```

## Day 7: Mix and Match

> Show us what you got by combining effects!

Ok, so there’s some kind of plasma beam energy gun going on in the background, and a slightly modified version of the scroller from Day 6 in the foreground. I really like it!

*~~251 characters~~ 246 characters*

{{ gifplayer(basename="img/day-07" width="512" height="288") }}

```lua
m=math
B=120K=68t=1s=m.sin
function TIC()T=t%580
for x=-B,B do for y=-K,K do
X=m.atan2(y,x)Y=B/x+y^x
c=X+Y+t/2pix(x+B,y+K,c/3)end end for A=2,4 do for a=0,6 do
print(('SPITLO'):sub(a,a),A+s(A)+240+a*48-T,A+K+s(T/9+A+a)*9,A,1,4+A)end end t=t+1 end
```

## Day 8: Round and Round

> Create an animated tentacle effect by rotating circles!

The Surveillance Snakes are watching! The instructions had the background bars covering the full screen immediately, but in my version the bars sort of slide in from the right until they cover the screen. It looks really nice and glitchy. And the snakes are creepy!

*215 characters*

{{ gifplayer(basename="img/day-08" width="512" height="288") }}

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

{{ gifplayer(basename="img/day-09" width="512" height="288") }}

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

*~~455 characters~~ 450 characters*

{{ gifplayer(basename="img/day-10" width="512" height="288") }}

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
print(('SPITLO'):sub(a,a),A+S(A)+240+a*48-T,A+L+S(T/9+A+a)*9,A,1,4+A)end end
t=t+1 end end
```

## Day 11: The Third Dimension

> Create a spinning 3D voxel cube!

I went a little crazy on this one, half of the challenge here too was to get the size down using a packer, but I was already in hand crunching mode which led to the mess below. 1083 characters, so well over any limit, but I mean the scrolling text alone takes 127.

I think it looks really cool but I should probably stop reusing the sine scroller from Day 6 now.

*~~1083 characters~~ 1078 characters*

{{ gifplayer(basename="img/day-11" width="512" height="288") }}

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
print(o:sub(a,a),240-(H/2)+a*44-U,H+5+90+S(U/20+a/2)*15,H+5,1,6+H)end end end
```

## Day 12: Rockin’ around the Christmas Tree!

> Create a spinning 3D christmas tree!

Mine is not really spinning, more like waddling. But I think it came out nice! It’s certainly an improvement over the christmas tree from Day 1! And the scroller gets to do one last cameo before we close this thing down.

At this point I have given up on the packer stuff, I hand crunched this and I’m happy. Thank yous go to everyone at L♥vebyte!!

*~~832 characters~~ 825 characters*

{{ gifplayer(basename="img/day-12" width="512" height="288") }}

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
print(O:sub(n,n),3+S(m)+240+n*8-T,m*3.4+10+S(T/24+m+n/2)*9,T/3+m,1,1)end end end
```

## Day 1 Extra: Playing with Fire!

> Explore the classic demoscene fire effect!

I was on fire so I kept right on with the extras. What better way to illustrate that than with some flaring flames?

*149 characters*

{{ gifplayer(basename="img/day-01-extra" width="512" height="288") }}

```lua
P=pix
cls()function TIC()for x=0,240 do
P(x,135,time()%x)for y=0,135 do
k=0
for i=-1,1 do
k=k+P(x+i,y-i)+P(x-i,y+i)+i end
P(x,y-1,k/5.6)end
end
end
```

## Day 2 Extra: Enter the Metaverse

> Actually, lets code some metaballs instead!

I saved one character by using "to the power of" (`time()^.3`) instead of "divided by" (`time()/600`) when slowing down the loop, which has the pleasant side effect of running the loop slower and slower. Which oddly enough turns the playful, bouncy interaction between the metaballs into some kind of sexy, gooey will-they-won't-they dance after a while. Weird.

*203 characters*

{{ gifplayer(basename="img/day-02-extra" width="512" height="288") }}

```lua
y=60
function D(x,y,X,Y)return((X-x)^2+(Y-y)^2)^.5
end
function TIC()t=time()^.3x=99+math.sin(t)*9X=99+math.cos(t)*69
for i=0,4e4 do
J=i%240K=i/240L=J/D(x,y,J,K)+K/D(X,y*.9,J,K)pix(J,K,L<16 and L)end
end
```

## Day 3 Extra: Connect the Dots

> Create a proximitor/connected dots effect!

The first challenge was to make the coolest looking connected dots effect regardless of size, so I went for something cinematic.

The idea is that a space fleet is hovering over an enemy planet, circling a target and awaiting instructions from Command. The "connect the dots" part is the intra-fleet communications about the target, symbolized by the target and the comms visualization having the same color. Maybe I overthunk this. But it turned out nice visually!

The second challenge was to make the smallest possible implementation of it, and I’m pretty happy with <1000 chars. I could get rid of the palette preview box which I only put there while I worked on the palette, but I like that it looks a bit status screeny (dashboardesque?) and my original plan was to put more stuff like that on the screen. But it was time to move on.

*~~956 characters~~ 949 characters*

{{ gifplayer(basename="img/day-03-extra" width="512" height="288") }}

```lua
F={}W=320H=136
O='TARGETS SELECTED... CROSS FLEET COMMUNICATIONS ESTABLISHED... AWAITING INSTRUCTIONS... DO WE HAVE GO? .... I REPEAT: DO WE HAVE GO?'P=pix
R=math.random
S=math.sin
function D(x,y,X,Y)return((X-x)^2+(Y-y)^2)^.5 end
for i=0,47 do
table.insert(F,{x=R(W),y=R(H),z=R(3)})poke(51*W+i,H/(1+2^(3-i%3-i/9)))if i<4 then poke(51*W+i,35*i)end end
table.sort(F,function(a,b)return a.z>b.z end)function TIC()cls()t=time()/W/9
i=S(t)j=S(t/3)for x=0,W do for y=0,H do
k=i*x-j*y
l=j*x+i*y
if (x+y)%2==0 then
P(x,y,(k/3%l/5)//3-6)end
k=0
for j=-1,1 do
k=k+P(x+j,y-j)+P(x-j,y+j)+j end
P(x,y-1,k/8)end end
for i=1,#F do
X=F[i].x
Y=F[i].y
Z=F[i].z
for j=1,#F do
U=F[j].x
V=F[j].y
if D(X,Y,U,V)<16 then
line(U,V,X,Y,1)end
end
tri(X,Y,X-32/Z,Y-32/Z,X+1/Z,Y-47/Z,9-Z*2)
tri(X,Y,X-16/Z,Y-37/Z,X+2/Z,Y-47/Z,9-Z*2-1)
F[i].x=(X+(i/H))%W
F[i].y=(Y+(i/H))%W
for c=0,15 do rect(c*5,0,5,5,c)end
K=t%8
for a=0,#O do
print(O:sub(a,a),W+a*6-K*H,130,15,1,1)end
end
end
```

## Day 4 Extra: Roto

> Create a full screen rotation effect!

I wanted to try using `poke` instead of `pix`. It’s one more character, but on the other hand it doesn’t use separate `x` and `y` coordinates so should be a win! Extra bonus is you get low rent raster if you use `poke` instead of `poke4`, so I went for this beautiful plaid roto pattern.

*152 characters*

{{ gifplayer(basename="img/day-04-extra" width="512" height="288") }}

```lua
W=240S=math.sin
function TIC()t=time()/W/7K=S(t-11)L=S(t)for i=0,16319 do
X=i%W-W/2+W*S(t)Y=i/W-9+L*9u=K*X-L*Y
v=S(t)*X+K*Y
poke(i,(u//4&v//4)|3)end
end
```

## Day 5 Extra: Flyover

> Combine rotation with a perspective effect!

 A roto similar to Day 4 Extra (and my version of Day 3 Extra) but this time with perspective. The story (I guess) is that we’re driving around some kind of future underground parking garage loooking for a space and we’re trying to drive past this drone, but it anticipates all our moves and swerves to keep us from passing. What an asshole!

*254 characters*

{{ gifplayer(basename="img/day-05-extra" width="512" height="288") }}

```lua
W=240S=math.sin
function TIC()t=time()/W/3
for i=0,4e4 do
x=i%W y=i/W
Z=math.abs(y-68)+0.1
u=(x-120)/Z
v=99/Z
pix(x,y,(u+S(S(t/5)*t/9-S(t)))//1&((v+t*3)//1)&3)end
rect(0,62,W,14,0)for e=0,3 do
elli(120-e*2+S(t)*2,70-e*2+S(t)*19,32-e*3,12-e*3,15-e)end
end
```

## Misc

To generate the GIFs, I used the F9 screen grab function in TIC-80. The I ran this command to extract a single PNG frame from every GIF:

```bash
for i in {02..12}; do convert "day-""$i"".gif[0]" "day-$i.png"; done
```

Then I shrunk and optimized the GIFs using [`gifsicle`](https://www.lcdf.org/gifsicle/):

```bash
gifsicle -b --resize 256x_ -O3 *.gif
```

The PNGs were optimized with ImageOptim.
