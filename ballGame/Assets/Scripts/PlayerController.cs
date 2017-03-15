using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour {

    public float speed;
    public Text countText;
    private Rigidbody rb;
    private int count;


	// Use this for initialization
	void Start () {
        rb = GetComponent<Rigidbody>();
        count = 0;
        SetCountText();
	}

    void FixedUpdate() {
        //MOVE THE CHARACTER
        //SPEED CAN BE ADJUSTED IN UNITY PLAYER CONTROLLER
        //use this input to add forces to the rigidbody and move the player game object in the scene.
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");
        //public void AddForce(Vector3 force, ForceMode mode = ForceMode.Force);
        //The X, Y, Z values will determine the direction of the force added to ball
        //0.0f - we dont want to move up
        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical);
        rb.AddForce(movement * speed);

    }
    // collision with other objects
    void OnTriggerEnter(Collider other) {
        //Destroy(other.gameObject);
        if (other.gameObject.CompareTag("Pickup"))
        {
            other.gameObject.SetActive(false);
            count = count + 1;
            SetCountText();
        }
    }
    void SetCountText()
    {
       countText.text = "Points: " + count.ToString();
    }
}
