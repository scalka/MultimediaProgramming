using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameOver : MonoBehaviour {
    public Text gameOver;
    public int count;

    void Start()
    {
        gameOver.text = "";
    }

    void OnCollisionEnter()
    {
        Invoke("Reload", 1.59f);
        gameOver.text = "GAME OVER";
    }
    void Reload()
    {
        Application.LoadLevel(Application.loadedLevel);
    }
}


