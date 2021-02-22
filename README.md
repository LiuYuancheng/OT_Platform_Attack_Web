# OT_Platform_Attack_Web

##### Introduction

This project is aim to create a web site server running on the orchestrator PC to provide a web interface to let the user control different cyber attack demos on OT railway module platform and show and show feed back display during the presentation. 

###### Program Running Env

![](doc/orchestratorPC.jpg)

###### Webpage View

![](doc/Web_view.png)

###### Attack Work Flow

![](doc/Attack_WorkFlow.png)



------

#### Program Setup

###### Development Environment : NodeJs(v12.18.4)/JavaScript HTML5

###### Additional Lib/Software Need :

NodeJs(v12.18.4)

Download and Install NodeJs on Windows: https://www.guru99.com/download-install-node-js.html

######  Hardware Needed : None

###### Program File List :

| Program File       | Execution Env         | Description                                                  |
| ------------------ | --------------------- | ------------------------------------------------------------ |
| node_modules       | Node.js(JavaScript)   | All the additional module which needed to import in the app.js |
| public             | HTML, CSS, JavaScript | The main web page interface.                                 |
| app.js             | Node.js(JavaScript)   | Main server program.                                         |
| httpserver.service | sh                    | Auto run setup when running on Linux Platform.               |
| playAlert.sh       | sh                    | Play the alert sound when the attack happens.                |
| runServer.sh       | sh                    | Run the app.js and removed the duplicate running if found.   |

First time setup on a computer: 

1. Copy the server folder to the computer and setup the auto run service during the system boot up: 

![Text Box: [Unit] Description=server side for GUI After=network.target [Install] WantedBy=multi-user.target Alias=webservice.service [Service] Type=simple User=root Group=root # Start main service ExecStart=/home/orchestrator/Attack/server/server/node /home/orchestrator/Attack/server/server/app.js # Give up if ping don't get an answer TimeoutSec=20 Restart=always ](file:///C:/Users/liu_y/AppData/Local/Temp/msohtmlclip1/01/clip_image001.png)1.Create a new service unit file at /etc/systemd/system/httpserver.service with below content. The name of the service unit is user defined and can be any name of your choice.

 

2. Reload the systemd process to consider newly created httpserver.service OR every time when httpserver.service gets modified: 

**# systemctl daemon-reload**

 

3. Enable this service to start after reboot automatically:

\# **systemctl enable** **httpserver****.service**

 

4. Start the service:

\# **systemctl start sample.service**

 

5. Reboot the host to verify whether the scripts are starting as expected during system boot.

\# **systemctl reboot**



------

##### Program Usage

###### Program execution cmd: 

In the "server" folder, run cmd: 

```
Node app.js
```

Open a web browser and type in link: http://localhost:8080/



Stealthy attack: 

Sequence of attack: **Without detection algorithm**

  1.1 Flickering of Airport runway light

  1.2 Train stop/start moving

  \2.  Effect lasted for 30 secs

  \3.  Switch off Airport runway light

  \4.  Wait for 10 secs

  \5.  Switch off Train

  \6.  Wait for 10 secs

  \7.  City light change to red

Sequence of attack: **With detection algorithm**

  1.1 Flickering of Airport runway light

  1.2 Train stop/start moving

  2.1 Effect lasted for 30 secs

  2.2 Attack detected - Sound Alarm and Pop up on HMI

  \3.  Operator click on [Manual] button on HMI to switch the control to manual --- if not follow without detection scenario

  3.1 Stop all the attack

  \4.  Everything back to normal 









------

> Last edit by LiuYuancheng([liu_yuan_cheng@hotmail.com](mailto:liu_yuan_cheng@hotmail.com)) at 14/10/2020