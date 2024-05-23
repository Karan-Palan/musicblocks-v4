# List of processes for each part of the Masonry Framework:

## DFD 1

1. **User**:
   - Interacts with the Masonry Framework
   - Drags and drops blocks from the palette to the workspace
   - Connects/disconnects blocks
   - Edits block properties (inline text editing, context menus)
   - Performs stack editing operations (repositioning, grouping, collapsing/expanding)
   - Searches and filters blocks in the palette
   - Clones/duplicates blocks
   - Scales and rotates blocks
   - Undoes/redos changes
   - Removes/deletes blocks

2. **Palette**:
   - Organizes and displays available blocks in categories
   - Allows collapsing/expanding categories
   - Provides visual separators and dividers between categories
   - Shows block previews with tooltips and visual cues
   - Enables searching and filtering of blocks
   - Facilitates drag and drop of blocks to the workspace

3. **Workspace**:
   - Serves as the canvas for creating and managing stacks of blocks
   - Allows connecting/disconnecting blocks
   - Enables stack editing operations (repositioning, grouping, collapsing/expanding)
   - Supports cloning/duplication of blocks
   - Provides scaling and rotation of blocks
   - Implements undo/redo functionality
   - Facilitates removal/deletion of blocks

4. **Blocks**:
   - Represents different types of blocks (Data Bricks, Expression Bricks, Statement Bricks, Block Bricks)
   - Displays distinct shapes, colors, sprites, labels, and input/output ports
   - Allows inline text editing and context menu interactions
   - Supports argument connections and brick-to-brick/stack connections

5. **Stack of Blocks**:
   - Manages the combination and execution of connected blocks
   - Performs stack validation with visual feedback and error indicators
   - Facilitates stack editing operations (repositioning, disconnecting, connecting)
   - Enables stack grouping with collapsible/expandable groups

## DFD 2

1. **Bricks**:
   - **Model**:
     - ManageBrickData: Handle brick data (e.g., values, properties, types)
     - HandleBrickConnections: Manage brick connections (input/output ports)
     - ValidateBrickConnections: Validate the connections between bricks
   - **View**:
     - RenderBrickAppearance: Display the visual appearance of bricks (shape, color, sprites, labels, ports)
     - ShowInlineEditor: Render inline text editors for editing brick data
     - ShowContextMenu: Display context menus for brick configurations
   - **Controller**:
     - HandleUserInput: Process user interactions (e.g., clicking, dragging, editing)
     - UpdateBrickData: Update brick data based on user input
     - TriggerViewUpdate: Notify the view to update the brick's appearance
     - ManageBrickInteractions: Handle brick interactions (e.g., connecting, disconnecting)

2. **Stack of Bricks**:
   - **Model**:
     - ManageBricksStackData: Handle data related to the stack of bricks
     - ValidateStackConnections: Validate the connections between bricks in the stack
     - HandleStackGrouping: Manage grouping and nesting of bricks in the stack
   - **View**:
     - RenderBricksStack: Display the stack of bricks
     - ShowValidationFeedback: Provide visual feedback for valid/invalid connections
     - ShowCollapsedGroups: Render collapsed/expanded groups of bricks in the stack
   - **Controller**:
     - HandleBrickConnections: Manage connecting/disconnecting bricks in the stack
     - PerformValidation: Trigger validation of brick connections in the stack
     - UpdateStackView: Notify the view to update the stack display
     - ManageStackGrouping: Handle grouping and ungrouping of bricks in the stack

3. **Palette**:
   - **Model**:
     - ManageBrickCategories: Handle data for brick categories
     - FilterBricks: Filter bricks based on user input
   - **View**:
     - DisplayCategories: Render the brick categories in the palette
     - ShowBrickPreviews: Display brick previews and tooltips
   - **Controller**:
     - HandleCategoryToggle: Expand/collapse brick categories
     - ProcessSearch: Handle user search input and filter bricks
     - UpdatePaletteView: Notify the view to update the palette display

4. **Workspace**:
   - **Model**:
     - ManageBricksStackData: Handle data related to stacks of bricks in the workspace
     - HandleUndoRedo: Manage undo/redo operations for the workspace
   - **View**:
     - RenderWorkspace: Display the workspace and stacks of bricks
     - ShowContextMenus: Render context menus for workspace interactions
   - **Controller**:
     - HandleStackOperations: Manage stack operations (create, delete, clone, move, group)
     - ProcessUndoRedo: Handle undo/redo requests from the user
     - UpdateWorkspaceView: Notify the view to update the workspace display
     - HandleBrickScaling: Handle scaling and resizing of bricks in the workspace
     - HandleBrickRotation: Handle rotation of bricks in the workspace

5. **User Interface**:
   - **View**:
     - RenderUI: Display the overall user interface
     - ShowToolbars: Render toolbars and UI controls
   - **Controller**:
     - HandleUIEvents: Process user interactions with the UI (e.g., toolbar buttons)
     - CoordinateComponents: Coordinate communication between components (bricks, stack, palette, workspace)