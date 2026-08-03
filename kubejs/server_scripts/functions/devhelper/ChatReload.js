PlayerEvents.chat((event) => {
    const { player, message, server } = event;
 
    const command = [
      "client-scripts",
      "config",
      "lang",
      "server-scripts",
      "startup-scripts",
      "textures",
    ];
    if (message == "re") {
      //command.forEach((c) => player.runCommand(`/kubejs reload ${c}`));
      player.runCommand('reload')
    }
  });
