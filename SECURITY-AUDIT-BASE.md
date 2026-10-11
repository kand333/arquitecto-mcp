┌─────────────────────┬────────────────────────────────────────────────────────┐
│ critical            │ proxy-addr vulnerable to IP spoofing via IPv4-mapped   │
│                     │ IPv6 trust subnet                                      │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ proxy-addr                                             │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=1.1.0 <2.0.8                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.0.8                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>express>proxy- │
│                     │ addr                                                   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>express-rate-  │
│                     │ limit>express>proxy-addr                               │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/                │
│                     │ sdk>express>proxy-addr                                 │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why proxy-addr` for more  │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-jqcg-44mw-7w3h      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ critical            │ Tinypool: Prototype Pollution gadget in worker options │
│                     │ leads to Remote Code Execution                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ tinypool                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <=2.1.0                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.1.1                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ .>vitest>tinypool                                      │
│                     │                                                        │
│                     │ packages__core>vitest>tinypool                         │
│                     │                                                        │
│                     │ packages__server>vitest>tinypool                       │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why tinypool` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-5gmw-xhrv-c9v3      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ critical            │ Tinypool: Prototype Pollution Gadget to RCE in run()   │
│                     │ options                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ tinypool                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <2.1.2                                                 │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=2.1.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ .>vitest>tinypool                                      │
│                     │                                                        │
│                     │ packages__core>vitest>tinypool                         │
│                     │                                                        │
│                     │ packages__server>vitest>tinypool                       │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why tinypool` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-85c8-ppgw-ccpr      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to host confusion via literal      │
│                     │ backslash authority delimiter                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.0.0 <=3.1.3                                        │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.4                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-v2hh-gcrm-f6hx      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to host confusion via backslash    │
│                     │ authority introducer                                   │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.0.0 <3.1.5                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.5                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-7p8r-x3mc-p8w7      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ ip-address: Address4 decodes leading-zero octets as    │
│                     │ decimal while resolvers decode them as octal, allowing │
│                     │ SSRF and trust-boundary bypass                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ ip-address                                             │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <=10.3.0                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=10.3.1                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>express-rate-  │
│                     │ limit>ip-address                                       │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>express-    │
│                     │ rate-limit>ip-address                                  │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-mwp4-54f8-5fhr      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ nanoid: custom generators can loop indefinitely when   │
│                     │ size is zero                                           │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ nanoid                                                 │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <3.3.18                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.3.18                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ .>vitest>@vitest/mocker>vite>postcss>nanoid            │
│                     │                                                        │
│                     │ .>vitest>vite>postcss>nanoid                           │
│                     │                                                        │
│                     │ .>vitest>vite-node>vite>postcss>nanoid                 │
│                     │                                                        │
│                     │ ... Found 13 paths, run `pnpm why nanoid` for more     │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-2v37-7h3g-55p8      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ PostCSS: Path Traversal in Previous Source Map         │
│                     │ Auto-Loading (sourceMappingURL) leads to Arbitrary     │
│                     │ .map File Disclosure                                   │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ postcss                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ <=8.5.17                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=8.5.18                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ .>vitest>@vitest/mocker>vite>postcss                   │
│                     │                                                        │
│                     │ .>vitest>vite>postcss                                  │
│                     │                                                        │
│                     │ .>vitest>vite-node>vite>postcss                        │
│                     │                                                        │
│                     │ ... Found 13 paths, run `pnpm why postcss` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-r28c-9q8g-f849      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to host confusion via skipped IDN  │
│                     │ canonicalization on scheme-relative references         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.1.3 <3.1.6                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.6                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-5jgf-p345-68v8      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to server-side request forgery via │
│                     │ malformed IPv6 normalization                           │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.0.0 <3.1.6                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.6                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-f65p-4m7j-42xc      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to server-side request forgery via │
│                     │ repeated hostname percent-decoding                     │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.1.2 <3.1.6                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.6                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-fph4-wmhf-6fwf      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to host confusion via              │
│                     │ percent-encoded scheme normalization                   │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.0.0 <3.1.6                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.6                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-jqff-g426-hqxp      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ fast-uri vulnerable to authority injection via an      │
│                     │ unvalidated port in serialize                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ fast-uri                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=3.0.0 <3.1.7                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=3.1.7                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk>ajv>fast-uri   │
│                     │                                                        │
│                     │ packages__cli>@modelcontextprotocol/sdk>ajv-           │
│                     │ formats>ajv>fast-uri                                   │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk>ajv>fast-   │
│                     │ uri                                                    │
│                     │                                                        │
│                     │ ... Found 4 paths, run `pnpm why fast-uri` for more    │
│                     │ information                                            │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-qw65-cvwx-89v3      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ source-map-js allows event-loop denial of service      │
│                     │ through indexed source-map section offsets             │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ source-map-js                                          │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=1.0.0 <1.2.2                                         │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=1.2.2                                                │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ .>vitest>@vitest/mocker>vite>postcss>source-map-js     │
│                     │                                                        │
│                     │ .>vitest>vite>postcss>source-map-js                    │
│                     │                                                        │
│                     │ .>vitest>vite-node>vite>postcss>source-map-js          │
│                     │                                                        │
│                     │ ... Found 13 paths, run `pnpm why source-map-js` for   │
│                     │ more information                                       │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-68fv-2mgg-jv7q      │
└─────────────────────┴────────────────────────────────────────────────────────┘
┌─────────────────────┬────────────────────────────────────────────────────────┐
│ high                │ MCP TypeScript SDK: OAuth client could send            │
│                     │ credentials to an authorization server chosen by the   │
│                     │ MCP server                                             │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Package             │ @modelcontextprotocol/sdk                              │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Vulnerable versions │ >=1.12.0 <1.31.0                                       │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Patched versions    │ >=1.31.0                                               │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ Paths               │ packages__cli>@modelcontextprotocol/sdk                │
│                     │                                                        │
│                     │ packages__server>@modelcontextprotocol/sdk             │
├─────────────────────┼────────────────────────────────────────────────────────┤
│ More info           │ https://github.com/advisories/GHSA-6qxp-vccf-f47h      │
└─────────────────────┴────────────────────────────────────────────────────────┘
37 vulnerabilities found
Severity: 1 low | 21 moderate | 12 high | 3 critical
