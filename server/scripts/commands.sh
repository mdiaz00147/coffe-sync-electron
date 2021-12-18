# search channel
grep  "TNT" channels.m3u -A 1 | grep  "LATINO" -A 1

# re-stream channel 
ffmpeg -i http://line.myott-ma.com:80/KYpJCJTwDXhoFri/ZAivJUPMX7jqjQv/101237 -vcodec libx264 -vb 1200k -acodec aac -ab 100k -ar 48000 -ac 2 -f flv -muxdelay 0.1 rtmp://localhost/live/STREAM_NAME
ffmpeg -i http://line.myott-ma.com:80/MDgs5sXioAybK56/pGZQuzLXkgrQqAN/101327 -vcodec libx264 -b:v 400k  -acodec aac -ab 100k -ar 48000 -ac 2 -f flv -muxdelay 0.1 rtmp://localhost/live/STREAM_NAME

# iptv links
http://line.myott-ma.com/get.php?username=KYpJCJTwDXhoFri&password=ZAivJUPMX7jqjQv&output=ts&type=m3u_plus
http://line.myott-ma.com/get.php?username=MDgs5sXioAybK56&password=pGZQuzLXkgrQqAN&output=ts&type=m3u_plus

# get token from server
curl -v --stderr -  "http://line.myott-ma.com:80/MDgs5sXioAybK56/pGZQuzLXkgrQqAN/101327" -vvv |  grep -o "token=.*"

# channels id
101327 # caracol
101330 # rcn
101331 # rcn hd 2
341718 # HBO FAMILY HD
341702 # HBO LATINO HD