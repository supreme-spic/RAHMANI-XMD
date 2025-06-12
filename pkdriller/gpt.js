const { zokou } = require('../framework/zokou');

zokou({ nomCom: "hellow", reaction: "👋", categorie: "fun" }, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;
  repondre('Habari yako! Karibu kwenye bot yako ya Rahmani_Xmd.');
});
