
export let nanoid = (e = 21) => {
  let t = '',
    r = crypto.getRandomValues(new Uint8Array(e));
  for (let n = 0; n < e; n++) t += 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'[63 & r[n]];
  return t;
};
