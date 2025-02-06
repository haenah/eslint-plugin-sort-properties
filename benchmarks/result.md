# Benchmark results

See [benchmark runner code](run.js) for more information.

## Running environment

- Node.js: v22.13.1
- Architecture: arm64
- Platform: darwin
- CPU: Apple M3 Pro
- OS: Darwin 23.5.0

## Comparison

<table><tr><th style="text-align:center";>Benchmark</th><th style="text-align:center";>Time(ms)</th><th style="text-align:center";>sort-object-expression</th><th style="text-align:center";>sort-keys-fix/sort-keys-fix</th></tr><tr><td rowspan="3">Object expression<br/>2 depth object with 1000 keys each</td><td style="text-align:center";>fix</td><td style="text-align:right";>0.09</td><td style="text-align:right";>0.52</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:right";>15.99</td><td style="text-align:right";>22.45</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:right";>3.96</td><td style="text-align:right";>7.87</td></tr><tr><td rowspan="3">Object expression<br/>4 depth object with 10 keys each</td><td style="text-align:center";>fix</td><td style="text-align:right";>2.56</td><td style="text-align:right";>13.96</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:right";>98.62</td><td style="text-align:right";>174.47</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:right";>39.01</td><td style="text-align:right";>175.24</td></tr></table>
