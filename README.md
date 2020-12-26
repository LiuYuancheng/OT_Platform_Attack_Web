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
| node_modules       | Node.js(JavaScript)   | All the additional module which need to import in the app.js |
| public             | HTML, CSS, JavaScript | The main web page interface.                                 |
| app.js             | Node.js(JavaScript)   | Main server program.                                         |
| httpserver.service | sh                    | Auto run setup when running on Linux Platform.               |
| playAlert.sh       | sh                    | Play the alert sound when the attack happens.                |
| runServer.sh       | sh                    | Run the app.js and removed the duplicate running if found.   |



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