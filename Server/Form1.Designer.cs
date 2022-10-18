namespace Server
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnConnect = new System.Windows.Forms.Button();
            this.btnGetStops = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.btnGetRoutes = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btnConnect
            // 
            this.btnConnect.Location = new System.Drawing.Point(0, 12);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(75, 23);
            this.btnConnect.TabIndex = 0;
            this.btnConnect.Text = "Connect";
            this.btnConnect.UseVisualStyleBackColor = true;
            // 
            // btnGetStops
            // 
            this.btnGetStops.Location = new System.Drawing.Point(0, 65);
            this.btnGetStops.Name = "btnGetStops";
            this.btnGetStops.Size = new System.Drawing.Size(75, 23);
            this.btnGetStops.TabIndex = 1;
            this.btnGetStops.Text = "Get Stops";
            this.btnGetStops.UseVisualStyleBackColor = true;
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(93, 65);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(75, 23);
            this.button3.TabIndex = 2;
            this.button3.Text = "button3";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // btnGetRoutes
            // 
            this.btnGetRoutes.Location = new System.Drawing.Point(93, 12);
            this.btnGetRoutes.Name = "btnGetRoutes";
            this.btnGetRoutes.Size = new System.Drawing.Size(75, 23);
            this.btnGetRoutes.TabIndex = 3;
            this.btnGetRoutes.Text = "Get Routes";
            this.btnGetRoutes.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.ClientSize = new System.Drawing.Size(317, 145);
            this.Controls.Add(this.btnGetRoutes);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.btnGetStops);
            this.Controls.Add(this.btnConnect);
            this.Name = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load_1);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btnConnect;
        private System.Windows.Forms.Button btnGetStops;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Button btnGetRoutes;
    }
}

