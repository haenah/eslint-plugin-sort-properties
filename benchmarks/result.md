# Benchmark results

See [benchmark runner code](run.js) for more information.

## Running environment

- Node.js: v22.13.1
- Architecture: arm64
- Platform: darwin
- CPU: Apple M3 Pro
- OS: Darwin 23.5.0

## Comparison

<table><tr><th style="text-align:center";>Benchmark</th><th style="text-align:center";>Time(ms)</th><th style="text-align:center";>sort-object-expression</th><th style="text-align:center";>sort-keys-fix/sort-keys-fix</th></tr><tr><td rowspan="3">Object expression<br/>2 depth object with 1000 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>0.10</td><td style="text-align:end";>0.67</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>19.34</td><td style="text-align:end";>33.60</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>4.61</td><td style="text-align:end";>10.85</td></tr><tr><td rowspan="3">Object expression<br/>4 depth object with 10 keys each</td><td style="text-align:center";>fix</td><td style="text-align:end";>2.84</td><td style="text-align:end";>11.40</td></tr><tr><td style="text-align:center";>parse</td><td style="text-align:end";>118.71</td><td style="text-align:end";>173.62</td></tr><tr><td style="text-align:center";>rule</td><td style="text-align:end";>42.29</td><td style="text-align:end";>188.05</td></tr></table>
