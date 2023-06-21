# Hexason

Hexason is an open-source project that consists of multiple applications, including Mirox Forest, an AI-based game, an ecommerce application, and a core server that provides the backbone for the other applications. All of the applications are housed within a single repository and can be found in the "apps" directory.

## Applications

The applications within Hexason use a variety of development strategies and technologies:

- **Hexason Client:** A `next.js` and `Supabase`-based application that provides ecommerce functionality.
- **Core Server:** A `Nest.js`-based application that provides `RestAPI` functionality and uses `SQL` for data storage.

## Installation

To install and set up Hexason, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the "apps" directory within the repository.
3. Follow the instructions in the `README.md` files within each application directory to install and set up each application.

## Usage

To use Hexason, follow these steps:

1. Start the Core Server application by running `pnpm dev` within the core server directory.
2. Follow the usage instructions within each application to interact with the features of that application.

## Contributing

We welcome contributions to Hexason from anyone in the community. To contribute, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Create a new branch for your changes.
3. Make your changes to the codebase.
4. Submit a pull request to the "develop" branch of the Hexason repository.
5. Wait for a maintainer to review and approve your changes.

Before submitting a pull request, please make sure to follow the guidelines for code style and formatting, which can be found in the `README.md` file within each application directory.

## License

Hexason is licensed under the MIT License. Please see the `LICENSE` file for more information.


## Custom Command list

```

pnpm hex:renew - type schema update, with format, lint


```