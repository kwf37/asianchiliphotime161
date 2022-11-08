{
  description = "Date:2022-11-06";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs {
        inherit system;
        config = { allowUnfree = true; };
      };
      in {
        devShell = with pkgs; 
          let vscodeWithExtensions = 
            vscode-with-extensions.override {
              vscodeExtensions = with vscode-extensions; [
                bbenoist.nix
                vscodevim.vim
                dbaeumer.vscode-eslint
                esbenp.prettier-vscode
                formulahendry.auto-rename-tag
                yzhang.markdown-all-in-one
                rust-lang.rust-analyzer
              ];
            };
          in 
            mkShell { 
              buildInputs = [ 
                nodejs-18_x
                yarn
                vscodeWithExtensions
              ]; 
            };
      });
}
