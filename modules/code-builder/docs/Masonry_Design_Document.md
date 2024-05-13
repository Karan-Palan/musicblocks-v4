
---

# Music Blocks v4 : Masonry Design Document

## Overview
1. **Short Description of the Product**
   - The Masonry (previously called Project Builder) in Music Blocks v4 facilitates graphical brick-based music composition, offering various block types such as Start, Rhythm, Note, Pitch, and Instrument blocks. Each brick represents a specific functionality, enabling users, especially children, to visually create music programs. The Masonry module simplifies the process of selecting and arranging bricks to generate music sequences.

2. **Key Features**
   - Enhance the brick library with comprehensive functionalities and render the stack of bricks.
   - Implement collision detection and enhance the user interface for a seamless user experience.
   - Add text to bricks (SVGs) for customization and personalization.
   - Introduce a palette feature, allowing for effortless music composition through intuitive drag-and-drop functionality.
   - Integrate Music Blocks v4 with Masonry to streamline music program creation.
   - Address bugs and make overall improvements to enhance the tool's performance and usability.

3. **Main User Activities**
   - Interacting with the bricks using the palette.
   - Composing music using visual programming bricks/stack of bricks.
   - Editing music sequences dynamically.

4. **Subsystems**
   - Palette Subsystem: Manages the palette interface within Music Blocks, providing a selection of bricks for users to drag and drop into the workspace.
   - Workspace Subsystem: Controls the workspace area where users can arrange bricks and create music compositions. 
   - Brick Stack Subsystem: Handles the creation and management of stacks of bricks within the workspace, allowing users to combine bricks to form musical sequences.
   - Collision Detection Subsystem: Implements collision detection functionality within the workspace, ensuring that bricks interact appropriately to prevent overlapping or conflicting arrangements.

5. **Additional Functionality and Design**
   - Implementation of a MusicBlocks guide button at the top of the interface for user convenience.
   - Integration of a collision detection UI inspired by the Blockly game by Google, enhancing user experience and interaction feedback.
   - Optimization of the palette by combining similar types of bricks, reducing clutter and improving usability.
   - Enhancement of the search functionality to facilitate easier navigation and selection of bricks within the palette.
   
6. **Purpose**
   - The purpose of this document is to outline the design and architecture of Masonry framework for Music Blocks v4

7. **Scope**
   - This document covers the technical details and design considerations of Music Blocks v4, including its features and subsystems.

8. **Audience**
   - The intended audience includes developers, contributors, and members involved in the development and maintenance of Music Blocks v4.

9. **Definitions and Abbreviations**
   - **Masonry:** The term used to describe the replication and enhancement of the functionality related to bricks from the palette, stack of bricks, and other related components of the project, aimed at improving their functionality and effectiveness.
   
[Screencast from 13-05-24 12:15:30 PM IST.webm](https://github.com/Karan-Palan/musicblocks-v4/assets/143683619/ae9df412-8b3a-4930-8635-ad89da828ba9)

10. **References**
   - [Link to Music Blocks v3 project](https://github.com/sugarlabs/musicblocks)
   - [Link to Masonry Framework](https://github.com/sugarlabs/musicblocks-v4/tree/develop/modules/code-builder)

## Requirements, Wiki Storages and Docs
1. **Requirements**
   - Functional requirements: Dynamic editing, text addition, UI enhancements, palette feature, integration with Music Blocks v4 project.
   - Non-functional requirements: Performance, scalability, maintainability.

2. **Wiki Storages**
   - [Link to project documentation](https://github.com/sugarlabs/musicblocks/blob/master/guide/README.md)

4. **Docs and Responsible Entities**
   - Documentation maintained by project contributors.
   - Responsible entities: Project maintainers, contributors.

5. **Roles, Responsibilities, and Assumptions**
   - Roles: Developers, contributors, project maintainers.
   - Responsibilities: Implementing features, reviewing code, documenting changes.
   - Assumptions: Basic understanding of React, JavaScript/TypeScript, and information about Music Blocks software.

## Architecture and Requirements Diagram
To be added

## Design Specification
To be added
