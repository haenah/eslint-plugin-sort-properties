# Benchmark results

See [benchmark runner code](run.js) for more information.

## Running environment

- Node.js: v22.13.1
- Architecture: arm64
- Platform: darwin
- CPU: Apple M3 Pro
- OS: Darwin 23.5.0

## Comparison

<table><tr><th style="text-align:center;">Benchmark</th><th style="text-align:center;">Time(ms)</th><th style="text-align:center;">sort-object-expression</th><th style="text-align:center;">sort-keys-fix/sort-keys-fix</th></tr><tr><td rowspan="4">Object expression:<br/>1 depth object with 10000 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.13</td><td style="text-align:end";>10.35</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>337.41</td><td style="text-align:end";>1222.55</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>254.81</td><td style="text-align:end";>153.40</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>1321.71</td><td style="text-align:end";>4472.37</td></tr><tr><td rowspan="4">Object expression:<br/>2 depth object with 100 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.60</td><td style="text-align:end";>11.90</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>423.94</td><td style="text-align:end";>1239.85</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>181.30</td><td style="text-align:end";>231.93</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>1643.37</td><td style="text-align:end";>4146.75</td></tr><tr><td rowspan="4">Object expression:<br/>4 depth object with 10 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>7.54</td><td style="text-align:end";>31.03</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>476.05</td><td style="text-align:end";>947.41</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>222.08</td><td style="text-align:end";>342.17</td></tr><tr><td style="text-align:center";>total</td><td style="text-align:end";>1832.54</td><td style="text-align:end";>3961.48</td></tr></table>
