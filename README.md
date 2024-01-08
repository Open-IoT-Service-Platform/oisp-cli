# OISP CLI
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FOpen-IoT-Service-Platform%2Foisp-cli.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FOpen-IoT-Service-Platform%2Foisp-cli?ref=badge_shield)
# NOTE: This project reached end of support and is no longer maintained. Parts of the project are continued in https://github.com/IndustryFusion/DigitalTwin.

The OISP Command-Line Interface allows you to perform common operations on an OISP instance using the REST API interface.

For an overview of the operations available see the [REST API](https://github.com/Open-IoT-Service-Platform/platform-launcher/wiki/REST-API) documentation.

## Getting Started

### Configuration
Before using the CLI you need to configure it so it knows how to communicate with your OISP instance. The CLI looks for the configuration file 'config.json' in the 'config' directory. A template is provided in the 'config' directory which you can copy and modify using your favourite text editor.
``` bash
cp config/config.json.template config/config.json
```

### Usage
To see a list of available commands run the following:
``` bash
./oisp-cli.js -h
```

## License

Copyright (c) 2014, Intel Corporation

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
* Neither the name of Intel Corporation nor the names of its contributors
  may be used to endorse or promote products derived from this software
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FOpen-IoT-Service-Platform%2Foisp-cli.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FOpen-IoT-Service-Platform%2Foisp-cli?ref=badge_large)
